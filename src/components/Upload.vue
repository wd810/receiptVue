<template>
  <div class="container py-5">

    <!-- For demo purpose -->
    <header class="text-white text-center">
        <p class="lead mb-0">Upload Receipt</p>
    </header>

    <div class="row py-4">
        <div class="col-lg-6 mx-auto">

            <!-- Upload image input-->
            <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <input id="upload" type="file" @change="readURL" class="form-control border-0">
                <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
                <div class="input-group-append">
                    <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                </div>
            </div>
            
            <div class="col-lg-12 row">
                <!-- Uploaded image area-->
                <div class="col-lg-6">
                    <p class="font-italic text-white text-center">The image uploaded: {{imgName}}</p>
                    <div class="image-area mt-4"><img id="imageResult" :src="imgSrc" alt="" class="img-fluid rounded shadow-sm mx-auto d-block"></div>
                    <button type="button" class="btn" :class="[ fileEmpty ? btn-alert : btn-promary ]" @click="postImg">Submit</button>
                    <i v-show="fileEmpty">Please Upload an Image</i>
                </div>

                <!-- extract information area -->
                <div class="col-lg-6" v-if="!showSpin">
                    <p class="font-italic text-white text-center">Extraction Result</p>
                    <div v-if="response.date">
                        <p>purchase date: {{response.date}}</p>
                        <p>supplier: {{response.supplier}}</p>
                        <p>total: {{response.total}}</p>
                        <p>subtotal: {{response.subtotal}}</p>
                        <p>hst: {{response.hst}}</p>
                    </div>
                    <div v-if="response.data">
                        <p>{{ response.data }}</p>
                    </div>
                </div>
                <!-- spinning area -->
                <div class="spinner-border" role="status" v-if="showSpin">
                    <span class="sr-only"></span>
                </div>
                
            </div>
            
        </div>
    </div>
  </div>

</template>

<script>
import axios from "axios"

export default {
  name: "upload",
  data() {
    return {
      selectedImg: null,
      fileEmpty: false,
      imgName: "",
      imgSrc: null,
      imgBase64: null,
      response: {},
      showSpin: false,
      API: "https://flask-app-back.herokuapp.com/upload"
    }
  },
  methods: {
    
    readURL(event) {
        this.selectedImg = event.target.files[0]
        console.log(this.selectedImg)
        this.imgName = this.selectedImg.name
        this.imgSrc = URL.createObjectURL(this.selectedImg)
    },
    async postImg() {
        if (this.selectedImg !== null) {
            this.showSpin = true
            this.fileEmpty = false
            const reader = new FileReader()
            reader.readAsDataURL(this.selectedImg)
            reader.onloadend = () => {
                this.imgBase64 = reader.result
                let data = {"base64": this.imgBase64}
                // console.log(data)
                axios.post(this.API, data)
                .then((response)=>{
                    this.response = response.data
                    console.log(this.response)
                    this.showSpin = false
                    this.selectedImg = null
                })
                .catch((error)=>{
                    console.log(error())
                })
            }
        } else {
            this.fileEmpty = true
        }
        
    }

    
  }
}
</script>

<style>

#upload {
    opacity: 0;
}

#upload-label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}

.image-area {
    border: 2px dashed rgba(255, 255, 255, 0.7);
    padding: 1rem;
    position: relative;
}

.image-area::before {
    content: 'Uploaded image result';
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    z-index: 1;
}

.image-area img {
    z-index: 2;
    position: relative;
}

body {
    min-height: 100vh;
    background-color: #757f9a;
    background-image: linear-gradient(147deg, #757f9a 0%, #d7dde8 100%);
}


</style>