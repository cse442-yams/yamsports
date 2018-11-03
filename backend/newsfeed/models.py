from django.db import models


class NewsFeed(models.Model):
    title = models.CharField(max_length=127)
    description = models.CharField(max_length=255)
    published = models.DateTimeField()
    link = models.URLField(max_length=200)
    modified_header = models.CharField(max_length=127, null=True)
    etag_header = models.CharField(max_length=127, null=True)


class NewsItem(models.Model):
    title = models.CharField(max_length=200)
    link = models.URLField(max_length=200)
    summary = models.CharField(max_length=255)
    pub_date = models.DateTimeField()


