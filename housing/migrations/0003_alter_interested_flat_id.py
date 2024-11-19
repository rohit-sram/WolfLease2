"""
    Adding foreign keys in Interested Database 
"""

# Generated by Django 4.1.1 on 2022-10-08 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    """
    Adding foreign keys in Interested Database 
    """

    dependencies = [
        ('housing',
         '0002_alter_owner_contact_email_alter_user_contact_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interested',
            name='flat_id',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to='housing.flat'),
        ),
    ]
