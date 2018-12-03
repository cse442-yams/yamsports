from yamsports.common import *

import dj_database_url
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)


sentry_sdk.init(
    dsn="https://bfd7d0f673ae484384b83d5a1067a184@sentry.io/1334944",
    integrations=[DjangoIntegration()]
)
