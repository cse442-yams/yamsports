from django.core.management import BaseCommand

import feedparser
from datetime import datetime
import time

from pytz import utc

from newsfeed.models import NewsFeedURL, NewsItem, NewsFeed


class Command(BaseCommand):

    def handle(self, *args, **options):
        feeds = NewsFeedURL.objects.all()
        for feed in feeds:
            self.stdout.write(self.style.NOTICE(f'Fetching feed {feed.url} ... '), ending='')
            self.stdout.flush()

            # Fetch the url and get a parsed feed
            f = feedparser.parse(feed.url, modified=feed.modified_header, etag=feed.etag_header)

            if f.status == 200:
                # 200 code means data was returned, process items
                self.stdout.write(self.style.NOTICE('processing entries'))

                # get the modified or etag headers to send with future requests
                feed.modified_header = f.get('modified')
                feed.etag_header = f.get('etag')
                feed.save()

                for item in f.entries:
                    # annoyingly, some feeds have the published date but some only have 'updated', so try both
                    item_date = item.get('published_parsed') if 'published_parsed' in item else item.updated_parsed
                    NewsItem.objects.update_or_create(
                        link=item.link,
                        defaults={
                            'title': item.title,
                            'summary': item.summary,
                            'pub_date': datetime.fromtimestamp(time.mktime(item_date), tz=utc)
                        }
                    )

                if feed.news_feed_info is None:
                    # Store the feed information if it doesn't exist
                    updated = f.feed.get('updated_parsed')
                    feed_info = NewsFeed.objects.create(
                        title=f.feed.title,
                        description=f.feed.description,
                        link=f.feed.link,
                        updated=datetime.fromtimestamp(time.mktime(updated), tz=utc) if updated else None
                    )

                    feed.news_feed_info = feed_info
                    feed.save()
                else:
                    # otherwise just update the last-updated date
                    updated = f.feed.get('updated_parsed')
                    feed.news_feed_info.updated = datetime.fromtimestamp(time.mktime(updated), tz=utc) if updated else None
                    feed.news_feed_info.save()

            elif f.status == 304:
                self.stdout.write(self.style.NOTICE('not modified'))
            else:
                self.stdout.write(self.style.NOTICE('error getting feed'))
