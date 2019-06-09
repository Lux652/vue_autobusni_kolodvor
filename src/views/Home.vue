<template>
  <div class="home">
    <h1>Kreiraj kartu</h1>

    <v-container class="my-5">
      <v-layout row class="mb-4">
        <v-flex xs12 sm6 d-flex>
          <v-select
            v-model="polaziste"
            :items="gradovi"
            item-text="gradovi_naziv"
            label="Polaziste"
            outline
            return-object
          ></v-select>
        </v-flex>

        <v-flex class="mx-4">
          <v-radio-group row v-model="tipKarte">
            <v-radio
              color="success"
              v-for="(tip,index) in kruh"
              :key="index"
              :label="`${tip.tip}`"
              :value="tip.tip"
            ></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex xs12 sm6 d-flex>
          <v-select
            v-model="odrediste"
            :items="gradovi"
            item-text="gradovi_naziv"
            label="Odrediste"
            outline
            return-object
          ></v-select>
        </v-flex>
      </v-layout>

      <v-layout row class="mb-4">
        <v-flex xs12 sm6 d-flex>
          <v-btn color="primary" @click="submit">Kreiraj</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import { posix } from "path";

export default {
  data() {
    return {
      gradovi: [],
      karte: [],
      kruh: [{ tip: "Jednosmjerna" }, { tip: "Povratna" }],
      polaziste: null,
      odrediste: null,
      tipKarte: null,
      datumKreiranja: null,
      polaziste_lat: null,
      polaziste_lng: null,
      odrediste_lat: null,
      odrediste_lng: null
    };
  },
  methods: {
    getDate() {
      let cur_date_vue = new Date();
      let month = ("0" + (cur_date_vue.getMonth() + 1)).slice(-2);
      let date = ("0" + cur_date_vue.getDate()).slice(-2);
      let year = cur_date_vue.getFullYear();
      let date_formated_vue = date + "." + month + "." + year;
      return date_formated_vue;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },

    Haversine(lat1, lng1, lat2, lng2) {
      lat1 = this.polaziste.lat;
      lng1 = this.polaziste.lng;
      lat2 = this.odrediste.lat;
      lng2 = this.odrediste.lng;
      const R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(lat2 - lat1); // deg2rad below
      let dLon = this.deg2rad(lng2 - lng1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c; // Distance in km
      return d;
    },

    dajCijenu() {
      let Udaljenost = this.Haversine().toFixed(2);
      let Jednosmjerna = Udaljenost * (0.35).toFixed(2);
      let cijena1 = Jednosmjerna * 2;
      let cijena2 = Jednosmjerna * 2 * 0.3;
      let povratna = cijena1 - cijena2;

      if (this.tipKarte == "Jednosmjerna") {
        return Jednosmjerna.toFixed(2);
      } else if (this.tipKarte == "Povratna") {
        return povratna.toFixed(2);
      }
    },

    submit() {
      db.collection("karte")
        .add({
          cijena: `${this.dajCijenu()} kn`,
          Udaljenost: `${this.Haversine().toFixed(2)} km`,
          tip: this.tipKarte,
          datum: this.getDate(),
          odrediste: this.odrediste.gradovi_naziv,
          polaziste: this.polaziste.gradovi_naziv
        })
        .then(() => {
          console.log("dr franjo tudman");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    gradovi: db.collection("gradovi")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let grad = doc.data();
          grad.id = doc.id;
          this.gradovi.push(grad);
        });
      });

    karte: db.collection("karte")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let karta = doc.data();
          karta.id = doc.id;
          this.karte.push(karta);
        });
      });
  }
};
</script>
