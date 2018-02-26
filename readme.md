# Food-manager API

## Using the server

View this readme with `http://<your-ip>:<your-port>/docs`

Send all request to `http://<your-ip>:<your-port>/api`

## API Endpoint

The following endpoints are available:

| Endpoints | Usage | Params |
|:---------:|:-----:|--------|
| `GET /barcode` | Get all barcodes | |
| `POST /barcode` | Add a new barcode and add 1 unit to the inventory | **code** - [string] EAN-13 barcode <br> **category** - [string] One from Categories enum <br> **manufacturer** - [string] <br> **product** - [string] <br> **measureUnit** - [string] One from MeasureUnit enum <br> **quantity** - [number]
| `GET /barcode/:barcode_code` | Get the selected barcode or `null` if not found | **:barcode_code** - [string] Barcode id |
| `GET /inventory` | Get all inventory <br> Return barcode details too | |
| `POST /inventory` | Add new item to inventory | **product** - [string] Barcode id to add <br> **quantity** - [quantity] Number of items to add |
| `GET /inventory/item/:barcode_code` | Get selected inventory item | **:barcode_code** - [string] Barcode id |
| `PUT /inventory/item/:barcode_code` | Add 1 selected item to inventory | **:barcode_code** - [string] Barcode id |