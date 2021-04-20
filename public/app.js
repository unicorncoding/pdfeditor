new Vue({
	el: '#app',
	data: {
		uploadInProgress: false,
		uploadProgress: 0,
		editablePdf: '',
		error: '',
		file: ''
	  },
	watch: {
		file() {
		  this.handleFileUpload();
		}
	},
	  methods: {
		download() {
			window.print();
		},
		handleFileUpload() {
		  this.uploadInProgress = true;
		  const headers = { 'Content-Type': 'multipart/form-data' }
		  const formData = new FormData();
		  formData.append('file', this.file);
		  axios
		  	.post('/', formData, { headers })
		  	.then(body => {
		  		this.editablePdf = body.data
			})
			.catch(err => {
				const msg = err.response.data.message
		  		this.error = msg || err.response.data
			}).finally(() => {
				this.uploadInProgress = false;
			});
		}
	  }	
});
