# Generated by Django 2.2.3 on 2019-07-13 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_member_subscription'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='admino', max_length=32, verbose_name='user name'),
            preserve_default=False,
        ),
    ]