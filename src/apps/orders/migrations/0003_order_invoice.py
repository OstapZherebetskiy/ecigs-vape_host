# Generated by Django 4.2.3 on 2023-07-20 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_alter_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='invoice',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Invoice'),
        ),
    ]
