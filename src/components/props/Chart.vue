<template>
  <v-row justify="center" align="center">
    <v-col cols="12" lg="12">
      <div class="card mt-2">
        <div class="card-img-bottom">
          <!--  <chartjs-line
            :datasets='dataset'
            :beginzero='beginZero'
            :bind='true'
            :labels="labels"
          /> -->
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Chart from 'chart.js'
export default {
  components: [Chart],
  /*props: [ 'dataset' ],
  data() {
    return {
      beginZero: true,
      labels: [
        "Aug 10, 2019", 
        "Aug 11, 2019", 
        "Aug 12, 2019", 
        "Aug 13, 2019", 
        "Aug 14, 2019", 
        "Aug 15, 2019", 
        "Aug 16, 2019", 
        "Aug 17, 2019", 
        "Aug 18, 2019", 
        "Aug 19, 2019"]
    };
  }*/
}
var ctx = document.getElementById('myChart').getContext('2d')
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
})
</script>
