## The project

Deploy with `kubectl apply -f manifests`

### Comparison between DBaaS and DIY

- DBaaS: Google Cloud SQL
  - Service type: PostgreSQL
  - Machine type: db-standard-2 (2 vCPUs, 7.5 GiB RAM)
  - Storage: 100 GiB (SSD)
  - Monthly cost: 99.24 €
- DIY: StatefulSet and PersistentVolume in Kubernetes
  - StatefulSet:
    - No extra infrastructure needed (as long as your cluster is powerful enough to run the database)
  - PersistentVolume:
    - 1 x Google Cloud Persistent Disk:
      - Type: Zonal SSD
      - Capacity: 100 GiB
      - Monthly cost: 14.59 €
- Setup effort:
  - DBaaS: The database can be created in Google Cloud Console with an easy-to-use GUI
  - DIY: Have to write all the Kubernetes configurations yourself
- Maintenance effort:
  - Updating OS and the database minor version:
    - DBaaS: Automatic, can usually be done without shutting down the database
    - DIY: Have to manually update the container image in the StatefulSet
  - Upgrading the database major version:
    - Both: Export the data and import into a new database instance manually
- Backups:
  - Price:
    - DBaaS: 6.87 € for each 100-GiB backup
    - DIY: 1.63 € for each 100-GiB backup (when stored in Google Cloud object storage)
  - Ease of usage:
    - DBaaS: Just select the backup configuration you want when creating the database and then the backups are automatic
    - DIY: Write a CronJob that backups the data automatically
- Conclusion:
  - DBaaS: Costs more than six times as much as the DIY solution but its setup is effortless and maintenance almost completely automated
  - DIY: Notably cheaper but need to write a lot of Kubernetes configurations and also manual maintenance is required
