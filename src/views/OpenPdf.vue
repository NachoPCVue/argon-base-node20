<template>
  <!-- Card stats -->
  <div id="app">
    <vue-pdf-embed :source="localpdf" />
  </div>
</template>

<script>
// import { database, storage } from "@/main"; // Removed unused imports
import VuePdfEmbed from 'vue-pdf-embed';
import 'primeflex/primeflex.css';

export default {
  components: {
    VuePdfEmbed
  },
  data() {
    return {
      localpdf: '',
      content: '<h1>Carta de garantía</h1><br>Contrato:'+this.POrder+'<br> Estimado proveedor, <br> Hacemos llegar la carta presente para hacer valer garantía expirando el 05 Marzo 2022<br> <strong>Treanselec</strong> <br> Orinoco 90, Las Condes, Región Metropolitana ',
      totalitems: 0,
      totalCommissioning: 0,
      total1YearOperation: 0,
      totalCapital: 0,
      nav: null,
      elementid: this.$route.params.elementid,
      fullTable: [],
      Equipment: "",
      POrder: "",
      Supplier: "",
      SpareType: "",
      PartNumber: "",
      Status: "",
      StatusType: "",
      Completion: "",
    };
  },
  methods: {
    
  },
  mounted() {
    //:elementid/:tipo/:nombrearchivo
    
    // if(this.$route.params.elementid!=undefined)
    // {
      //global.pdfSource=this.$route.params.elementid
     //https://104.44.128.58/Recursos/486030/Manual/OT.%201768%20Bomba%20horizontal%20Sulzer%20%2016.07.2020.pdf
      var buildName = "https://104.44.128.58/Recursos/"+this.$route.params.elementid+"/"+this.$route.params.tipo+"/"+this.$route.params.nombrearchivo;
      buildName = "https://smartprognosys.repairco.cl/Recursos/Reporte.pdf";
      global.pdfSource = buildName;//'https://gchub.myddns.me/Resources/Boiler.pdf'//'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf'
      global.pdfSource = 'assets/helloworld.pdf';
      this.localpdf = global.pdfSource;
      this.$router.push('/OpenPdf2');
    // }

    //global.pdfSource= 'https://docs.rs-online.com/1fca/0900766b8153f3b5.pdf'
    this.localpdf = global.pdfSource;
    console.log(this.localpdf);
    //READING PARAMETER
    // console.log(this.elementid);    
  },
};
</script>

<style lang="scss" scoped>
.shadow-box {
    min-height: 100px;
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin: 2rem;
    border-radius: 4px;
    background-color: var(--surface-e);
}

.p-button {
    margin-right: .5rem;
}

.p-buttonset {
    .p-button {
        margin-right: 0;
    }
}

.sizes {
    .button {
        margin-bottom: .5rem;
        display: block;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
