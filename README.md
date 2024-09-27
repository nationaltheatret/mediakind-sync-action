# Mediakind sync action

Denne Github-Action synkroniserer alle assets fra et miljo til et annet i MediaKind. På forhånd er man avhengig av at Storage Accounts for
de ulike miljøene er synkronisert. 

## Inputs

### `mediakind-access-token`

**Required** Mediakinds x-mkio-token`.

### `mediakind-source-project`

**Required** Hvilket prosjekt alle assets skal synkroniseres fra`.

### `mediakind-destination-project`

**Required** Hvilket prosjekt alle assets skal synkroniseres til`.

### `destination-storage-account`

**Required** Navn på den storage accounten destinasjonsprosjektet i mediakind bruker`.


## Example usage

``` 
- name: Run tests
        uses: nationaltheatret/mediakind-sync-action@main
        with:
            mediakind-access-token: ${{ secrets.MEDIAKIND_ACCESS_TOKEN }}
            mediakind-source-project: nt-mediakind-prod
            mediakind-destination-project: ${{ vars.MEDIA_PROJECT_NAME }}
            destination-storage-account: ${{ vars.AMS_STORAGE_ACCOUNT_NAME }}
          
```
