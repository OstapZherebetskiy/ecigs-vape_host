# Generated by Django 4.2.3 on 2023-07-24 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0002_good_stock_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='good',
            name='photo',
        ),
        migrations.AddField(
            model_name='good',
            name='main_photo',
            field=models.CharField(blank=True, choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], max_length=20, null=True, verbose_name='Main photo'),
        ),
        migrations.AddField(
            model_name='good',
            name='photo_1',
            field=models.ImageField(blank=True, null=True, upload_to='goods/photos/%Y/%m/%d', verbose_name='Photo 1'),
        ),
        migrations.AddField(
            model_name='good',
            name='photo_2',
            field=models.ImageField(blank=True, null=True, upload_to='goods/photos/%Y/%m/%d', verbose_name='Photo 2'),
        ),
        migrations.AddField(
            model_name='good',
            name='photo_3',
            field=models.ImageField(blank=True, null=True, upload_to='goods/photos/%Y/%m/%d', verbose_name='Photo 3'),
        ),
        migrations.AddField(
            model_name='good',
            name='photo_4',
            field=models.ImageField(blank=True, null=True, upload_to='goods/photos/%Y/%m/%d', verbose_name='Photo 4'),
        ),
        migrations.AddField(
            model_name='good',
            name='photo_5',
            field=models.ImageField(blank=True, null=True, upload_to='goods/photos/%Y/%m/%d', verbose_name='Photo 5'),
        ),
    ]