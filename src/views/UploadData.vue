<template>
  <div>
    Loaded {{datavalue}} {{new Date()}}
  </div>
</template>

<script>
// http://localhost:8080/#/uploaddata/4rD24Tw3prJ5Vwuu1j1PoxZwAx7QUTbb7b81erFnPovwtrqETZMk6E4QbvOfLcLnQGnHdaeJ5K3pnBJj6DOZVg==/300.5
// Charts
import { auth, database } from "@/main";
import { ref, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

var db_token='4rD24Tw3prJ5Vwuu1j1PoxZwAx7QUTbb7b81erFnPovwtrqETZMk6E4QbvOfLcLnQGnHdaeJ5K3pnBJj6DOZVg==' //only write token
var db_url="https://us-east-1-1.aws.cloud2.influxdata.com"
var bucket_name=""
var default_query=""

var dataXY=[]
var readFinished = false;
var readFinishedCount = 0;

let loggedin = false;
export default {
  components: {

  },
  data() {
    return {
      datavalue:this.$route.params.datavalue,
      keydb:this.$route.params.keydb,
    };
  },
  methods: {
    waitReadFinished(){
      if(readFinished == false)
      {
        readFinishedCount = readFinishedCount +1;
        if(readFinishedCount<3)
        {//try again, otherwise stop
          setTimeout(this.waitReadFinished, 2000);
        }else
        {
          this.updateSeriesLine()
        }
      }
    },
   
    getValues(){
        console.log("getValues")
        if(loggedin==false)
           return
        const {InfluxDB} = require('@influxdata/influxdb-client')

        // You can generate a Token from the "Tokens Tab" in the UI
        const token = db_token;//'qS....=='
        const org = 'cbastidas@gc-hub.tech'
        //const bucket = "cbastidas's Bucket"
        console.log(db_url)
        const client = new InfluxDB({url: db_url , token: token})

        const queryApi = client.getQueryApi(org)
        console.log(default_query)
        const query = default_query;//`from(bucket: "cbastidas's Bucket") |> range(start: 2021-06-24T22:00:00Z,stop:2021-06-26T01:00:00Z)`

       queryApi.queryRows(query, {
            
        next(row, tableMeta) {
          const o = tableMeta.toObject(row)
          //console.log(
          //  `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
          //)
  
          dataXY.push({
                    x: o._time,
                    y: o._value.toFixed(2)
                  })
          
        },
        error(error) {
          console.error(error)
          console.log('Finished ERROR')
        },
        complete() {
          console.log('Finished SUCCESS')
          readFinished = true;
        }
       
      })
      //setTimeout(this.updateSeriesLine, 2000);
      
    },
    setValue(){    
        if(db_token == this.$route.params.keydb)
        {
          const {InfluxDB} = require('@influxdata/influxdb-client')
          // You can generate a Token from the "Tokens Tab" in the UI
          const token = db_token
          const org = 'cbastidas@gc-hub.tech'
          const bucket = "cbastidas's Bucket"

          const client = new InfluxDB({url: db_url, token: token})

          const {Point} = require('@influxdata/influxdb-client')
          const writeApi = client.getWriteApi(org, bucket)
          writeApi.useDefaultTags({host: 'host1'})

          const point = new Point('mem')
            .floatField('used_percent', this.$route.params.datavalue)//23.43234543)
            .timestamp(new Date())
          writeApi.writePoint(point)
          writeApi
              .close()
              .then(() => {
                  console.log('FINISHED')
              })
              .catch(e => {
                  console.error(e)
                  console.log('Finished ERROR')
              })
        }
    },

    initConfigDB() {
      console.log("KEY***")
      console.log(this.$route.params.keydb)
      console.log(this.$route.params.datavalue) 
      console.log("initConfigDB");
      
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        console.log("USER SIGNED IN ");
      } else {
        // No user is signed in.
        //this.$router.push('/Login');
      }

      onAuthStateChanged(auth, (user) => {
        if (user) {
          loggedin = true;
          console.log("USER SIGNED IN 2");

          const globalConf = ref(database);
          onValue(globalConf, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if(childSnapshot.key=="db_token"){
                db_token = childSnapshot.val();
              } else if(childSnapshot.key=="db_url"){
                db_url = childSnapshot.val();
              }
            });
          });

          //replace user identifier @ and . by -
          var useremail=user.email
          useremail=useremail.replace("@","-").replace(".","-")
          console.log("************"+useremail)
          const starCountRef = ref(database, "users/"+useremail);

          onValue(starCountRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if(childSnapshot.key=="bucket_name"){
                bucket_name = childSnapshot.val();
                console.log(bucket_name);
              } else if(childSnapshot.key=="default_query"){
                default_query = childSnapshot.val();
                console.log(default_query);
              }
            });
          });
        } else {
          // No user is signed in.
          loggedin = false;
        }
      });
      
      //get values and update chart
      new Promise(() => {
        setTimeout(this.getValues, 3000);
      });
    },
  },
  mounted() { //when the website mounts...starts
    this.setValue();
  },
  created(){
    
  },
};
</script>
<style></style>
