# pdfeditor

Edit PDF like a Word Document. 

## Requirements

* Docker

## Usage

```
docker build . -t unicorn/pdfeditor
docker run -P unicorn/pdfeditor
```

🌐 **[Open localhost:8080](http://localhost:8080)**

## Cloud Run deployment

```
gcloud builds submit --tag gcr.io/<project id>/pdfeditor
gcloud run deploy pdfeditor --image gcr.io/<project id>/pdfeditor --platform managed --concurrency 1 --region us-central1
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
