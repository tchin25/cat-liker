<template>
  <v-card>
    <v-card-title primary-title class="justify-center">
      Upload Cat <v-icon class="pl-1">mdi-cloud-upload</v-icon></v-card-title
    >
    <div class="px-8">
      <v-row>
        <v-col>
          <v-text-field v-model="input.name" label="Enter Name">
            Name
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>Upload an image:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <input
            type="file"
            ref="imageUpload"
            @change="previewImage"
            accept="image/jpeg"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="12">
          <v-progress-linear
            v-model="uploadValue"
            color="cyan darken-2"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="primary"
        :disabled="input.name == '' || input.name == null"
        @click.prevent="onUploadFile"
        >Add</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddCat",
  data: function() {
    return {
      tab: null,
      imageData: null,
      picture: null,
      uploadValue: 0,
      input: {
        name: null
      },
      video: {
        src: ""
      },
      canvas: {},
      captures: "",
      stream: null,
      isMobile: false
    };
  },
  computed: {},
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },
    async onUploadFile() {
      this.picture = null;
      let storageRef = this.$fireStorage.ref();
      var childRef = storageRef
        .child(this.input.name + ".jpg")
        .put(this.imageData);
      await childRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          childRef.snapshot.ref.getDownloadURL().then(url => {
            let cat = {
              img: url.toString(),
              name: this.input.name,
              createdAt: this.$fireStoreObj.FieldValue.serverTimestamp(),
              likes: 0,
              recentComments: []
            };
            let catsDoc = this.$fireStore.collection("cats").add(cat);
            this.input.name = null;
            this.picture = null;
            this.$refs.imageUpload.value = null;
            this.$emit("addedImage");
          });
        }
      );
    }
  }
};
</script>

<style></style>
