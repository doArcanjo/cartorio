export default {
  methods:{  
    loadFile(e){
      // console.log('loadFile',e);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createInput(files[0]);
    },
    createInput(file) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {

          vm.fileinput = reader.result;
          // console.log('data:',vm.fileinput);
          this.LoadData({data:vm.fileinput})
        }
        reader.readAsText(file);
    },
    LoadData(data) {
      console.error(`'LoadData' is coming from fileLoader (mixin) :
        Implement 'LoadData' method in the component`,data);
    },
    saveFileCSV(filename,data) {
      // console.log('saveFile into CSV in FileLoader Mixin using ALasQL');
      alasql(`SELECT * INTO CSV("${filename}.csv",{headers:true}) FROM ?`,[data]);
    }
  }
}