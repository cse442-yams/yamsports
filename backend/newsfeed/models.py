from django.db import models


class NewsFeed(models.Model):
    title = models.CharField(max_length=127)
    description = models.CharField(max_length=255)
    updated = models.DateTimeField(null=True)
    link = models.URLField(max_length=200)


class NewsFeedURL(models.Model):
    url = models.URLField(max_length=200, unique=True, db_index=True)
    modified_header = models.CharField(max_length=127, null=True)
    etag_header = models.CharField(max_length=127, null=True)
    news_feed_info = models.OneToOneField(NewsFeed, on_delete=models.CASCADE, null=True)


class NewsItem(models.Model):
    title = models.CharField(max_length=200)
    link = models.URLField(max_length=200, unique=True, db_index=True)
    summary = models.CharField(max_length=255)
    pub_date = models.DateTimeField()


