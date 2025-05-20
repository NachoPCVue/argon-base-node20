<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-6 col-lg-4">
        <div class="row mb-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header pb-0">
                <h6>Equipos por perder la garantía en 30, 60 y 90 días</h6>
              </div>
              <div class="card-body p-3">
                <div id="chart">
                  <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Equipos en falla</h6>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Equipo</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Ubicación</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Días restantes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(equipo, index) in equiposEnFalla" :key="index">
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{ equipo.name }}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{ equipo.location }}</p>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{ equipo.dias }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-6 col-lg-4">
        <div class="row mb-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header pb-0">
                <h6>Equipos en garantía vs fuera de garantía</h6>
              </div>
              <div class="card-body p-3">
                <div class="chart">
                  <apexchart width="350" type="donut" :options="chartOptionsPie" :series="seriesPie"></apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="card-header pb-0">
                <h6>Garantías por vencer en menos de 90 días</h6>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Equipo</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Ubicación</th>
                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Días restantes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(equipo, index) in equiposGrantiasPorVencer" :key="index">
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{ equipo.name }}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p class="text-xs font-weight-bold mb-0">{{ equipo.location }}</p>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{ equipo.dias }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getActivosGarantias } from "@/model/functions";
import { auth } from "@/main";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "MiSigDashboard",
  setup() {
    const username = ref(null);
    const equiposEnFalla = ref([]);
    const equiposGrantiasPorVencer = ref([]);
    const SE = "Central";

    const chartOptions = ref({
      chart: {
        type: 'bar',
        stacked: true,
        id: 'vuechart-example'
      },
      xaxis: {
        categories: ["MAR 2022", "ABR 2022", "MAY 2022", "JUN 2022", "JUL 2022", "AGO 2022"]
      }
    });

    const series = ref([
      {
        name: '> 90 días',
        data: [96, 96, 96, 96, 30, 25]
      },
      {
        name: '< 90 días',
        data: [10, 10, 10, 10, 60, 55]
      },
      {
        name: '< 60 días',
        data: [4, 10, 10, 10, 20, 30]
      },
      {
        name: '< 30 días',
        data: [0, 4, 10, 10, 20, 20]
      }
    ]);

    const chartOptionsPie = ref({
      chart: {
        type: 'donut',
      },
      dataLabels: {
        enabled: true,
      },
      labels: ['> 90 días', '< 90 días', 'Sin garantía', 'Garantia expirada'],
    });

    const seriesPie = ref([96, 10, 4, 0]);

    const initTables = () => {
      console.log("<·><><·> initTables() <·><><·>");

      getActivosGarantias(SE, (datos) => {
        let equiposEnFallaTemp = [];
        let equiposGrantiasPorVencerTemp = [];

        let equiposSinGarantia = 0;
        let garantiaExpirada = 0;
        let garantiaMasDe90 = 0;
        let garantiaMenosDe90 = 0;
        let garantiaMenosDe60 = 0;
        let garantiaMenosDe30 = 0;

        datos.forEach(ArrayDB => {
          const diasGrantiaRestantes = Math.ceil((new Date(ArrayDB.fechaFinGarantia).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

          // Equipos en falla
          if (ArrayDB.falla) {
            equiposEnFallaTemp.push({
              name: ArrayDB.nombreEquipo,
              location: ArrayDB.ubicacion,
              dias: diasGrantiaRestantes,
            });
          }

          // Equipos Garantias próximas a vencer
          if (diasGrantiaRestantes < 90) {
            equiposGrantiasPorVencerTemp.push({
              name: ArrayDB.nombreEquipo,
              location: ArrayDB.ubicacion,
              dias: diasGrantiaRestantes,
            });
          }

          // Equipos en garantía vs fuera de garantía
          if (diasGrantiaRestantes < 0) { // garantía expirada
            ++garantiaExpirada;
          }
          else if (diasGrantiaRestantes >= 90) {
            ++garantiaMasDe90;
          }
          else if (diasGrantiaRestantes < 90) {
            ++garantiaMenosDe90;
          }
          else if (diasGrantiaRestantes < 60) {
            ++garantiaMenosDe60;
          }
          else if (diasGrantiaRestantes < 30) {
            ++garantiaMenosDe30;
          }
        });

        equiposEnFalla.value = equiposEnFallaTemp;
        equiposGrantiasPorVencer.value = equiposGrantiasPorVencerTemp;
        seriesPie.value = [garantiaMasDe90, garantiaMenosDe90, equiposSinGarantia, garantiaExpirada];

        series.value = [
          {
            name: '> 90 días',
            data: [garantiaMasDe90, garantiaMasDe90, garantiaMasDe90, garantiaMasDe90, garantiaMasDe90, garantiaMasDe90]
          },
          {
            name: '< 90 días',
            data: [garantiaMenosDe90, garantiaMenosDe90, garantiaMenosDe90, garantiaMenosDe90, garantiaMenosDe90, garantiaMenosDe90]
          },
          {
            name: '< 60 días',
            data: [garantiaMenosDe60, garantiaMenosDe60, garantiaMenosDe60, garantiaMenosDe60, garantiaMenosDe60, garantiaMenosDe60]
          },
          {
            name: '< 30 días',
            data: [garantiaMenosDe30, garantiaMenosDe30, garantiaMenosDe30, garantiaMenosDe30, garantiaMenosDe30, garantiaMenosDe30]
          }
        ];
      });
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          username.value = user.email;
          console.log("USER SIGNED IN Dashboard");
          initTables();
        } else {
          console.log("USER NOT SIGNED");
          // Redirect to login page
          window.location.href = "/#/login";
        }
      });
    });

    return {
      chartOptions,
      series,
      chartOptionsPie,
      seriesPie,
      equiposEnFalla,
      equiposGrantiasPorVencer
    };
  }
};
</script>
