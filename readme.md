# Food-manager API

## Using the server

View this readme with `http://<your-ip>:3000/docs`

Send all request to `http://<your-ip>:3000/api`

## API Endpoint

The following endpoints are available:

| Endpoints | Usage | Params |
|:---------:|:-----:|--------|
| `GET /barcode` | Get all barcodes | |
| `POST /barcode` | Add a new barcode and add 1 unit to the inventory | **code** - [string] EAN-13 barcode <br> **category** - [string] One from Categories enum <br> **manufacturer** - [string] <br> **product** - [string] <br> **measureUnit** - [string] One from MeasureUnit enum <br> **quantity** - [number]
| `GET /barcode/:barcode_code` | Get the selected barcode or `null` if not found | |