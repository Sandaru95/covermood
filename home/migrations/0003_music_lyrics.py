# Generated by Django 3.0.5 on 2020-04-14 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20200414_1121'),
    ]

    operations = [
        migrations.AddField(
            model_name='music',
            name='lyrics',
            field=models.TextField(default='nice', max_length=1000),
            preserve_default=False,
        ),
    ]
