# Generated by Django 4.2.3 on 2023-07-20 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(blank=True, choices=[('new', 'New'), ('active', 'Active'), ('completed', 'Completed'), ('canceled', 'Canceled')], max_length=20, null=True, verbose_name='Status'),
        ),
    ]
