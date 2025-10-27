<template>
  <div
    class="tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
  >
    <div
      class="-tw-mx-4 tw-bg-primary-40 tw-px-8 tw-py-4 tw-text-center tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-20"
    >
      <svg
        viewBox="0 0 295.01 403.72"
        xmlns="http://www.w3.org/2000/svg"
        class="tw-h-20"
      >
        <path
          class="tw-fill-current"
          d="m147.51 1.875c-80.34 0-145.63 65.291-145.63 145.63 0 84.709 87.863 198.79 126.94 245.63 9.708 11.651 27.428 11.651 37.137 0 39.32-46.845 127.18-160.92 127.18-245.63 0-80.34-65.291-145.63-145.63-145.63zm0 70.631c34.895 0 63.158 3.9481 63.158 31.58v78.945c0 6.948-3.0785 13.185-7.8945 17.527v10.105c0 6.553-5.3678 11.842-11.842 11.842-6.553 0-11.842-5.3678-11.842-11.842v-3.9473h-63.158v3.9473a11.826 11.826 0 0 1-11.842 11.842 11.826 11.826 0 0 1-11.844-11.842v-10.105c-4.816-4.342-7.8945-10.579-7.8945-17.527v-78.945c0-27.632 28.263-31.58 63.158-31.58zm-47.367 31.58v39.473h94.734v-39.473h-94.734zm11.842 63.156a11.826 11.826 0 0 0-11.842 11.844 11.826 11.826 0 0 0 11.842 11.842c6.552 0 11.842-5.2888 11.842-11.842a11.826 11.826 0 0 0-11.842-11.844zm71.051 0c-6.552 0-11.842 5.2908-11.842 11.844a11.826 11.826 0 0 0 11.842 11.842 11.826 11.826 0 0 0 11.842-11.842 11.826 11.826 0 0 0-11.842-11.844z"
        />
      </svg>
      <h1 class="tw-mt-4 tw-font-heading">{{ $t('appName') }}</h1>
      <h3>{{ $t('slogan') }}</h3>
      <p class="!tw-mb-0">Version {{ version }}</p>
    </div>
    <h3 class="tw-mt-4 tw-text-lg tw-font-medium">Technologies</h3>
    <p class="!tw-mb-0">
      Transit Tracker ne serait pas possible sans l'utiliser des technologies et
      libraries suivantes, crées par d'autres développeurs :
    </p>

    <ul>
      <li>PHP</li>
      <li>Laravel</li>
      <li>Javascript</li>
      <li>Vue.js</li>
      <li>Nuxt.js</li>
      <li>Vuetify</li>
    </ul>
    <h3 class="tw-mt-4 tw-text-lg tw-font-medium">Comment ca fonctionne?</h3>
    <p class="!tw-mb-1">
      La quasi totalité des données diffusées dans l'application proviennent des
      sociétés de transport. Voici comment ce processus s'effectue :
    </p>
    <ol class="">
      <li>
        Transit Tracker récupère la liste des véhicules actifs auprès de
        l'agence, environ à chaque minute ou deux minutes;
      </li>
      <li>
        Le serveur tente d'extraire le plus d'information possible afin de les
        stocker dans la base de donnée;
      </li>
      <li>
        Le serveur associe certaines informations, comme le numéro de la route,
        à partir des données statiques récupérées quotidiennement;
      </li>
      <li>
        Lors de leur visite, les visiteurs de l'application télécharge du
        serveur la liste des véhicules actifs avec les données reliées.
      </li>
    </ol>
    <p class="!tw-mb-1 tw-mt-2">
      Avec ce fonctionnement, il y a certains points à prendre en considération
      :
    </p>
    <ul>
      <li>
        <b>Différences entre les agences :</b> Ce n'est pas toutes les agences
        qui fournissent les mêmes données. Il peut alors y avoir certaines
        informations disponibles chez une agence mais pas chez l'autre;
      </li>
      <li>
        <b>Données incorrectes :</b> Transit Tracker n'effectue pas de
        validation des données, il retransmet ce que l'agence fourni. Il peut y
        avoir des erreurs dans ces données;
      </li>
      <li>
        <b>Contribution communautaire :</b> Pour certaines agences, comme les
        secteurs d'autobus d'exo, nous utilisons les contributions
        communautaires pour relier les identifiants des véhicules avec leur
        numéro de flotte.
        <a href="https://vin.transittracker.ca" target="_blank"
          >Voir le projet exo VIN</a
        >;
      </li>
    </ul>
    <h3 class="tw-mt-4 tw-text-lg tw-font-medium">
      Sans publicité et sans suivi
    </h3>
    <p class="!tw-mb-0">
      Les coûts d'opérations de Transit Tracker (serveur, domaine) sont assumées
      par son créateur. Aucune publicité n'est diffusée dans l'application.
      <br />
      Le programme Cloudflare Web Analytics est utilisée pour obtenir certaines
      statistiques sur l'application. Contrairement à d'autres produits,
      celui-ci ne fait pas le suivi des visiteurs individuels, étant conçu pour
      le respect de la vie privée.
    </p>
    <h3 class="tw-mt-4 tw-text-lg tw-font-medium">Vous êtes développeurs?</h3>
    <p class="!tw-mb-0">
      Vous pouvez utiliser la plupart des données de Transit Tracker dans votre
      application! <br />
      Le code source de Transit Tracker est aussi disponible sur GitHub. Vous
      êtes bienvenues de contribuer au développement de l'application ou de vous
      en inspirer!
    </p>
    <div class="tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-gap-2">
      <TwFilledButton
        color="secondary"
        tag="a"
        href="https://api.transittracker.ca/docs"
        target="_blank"
        with-icon
      >
        <TwIcon :path="mdiApi" />
        Documentation de l'API
      </TwFilledButton>
      <TwFilledButton
        color="secondary"
        tag="a"
        href="https://github.com/TransitTracker"
        target="_blank"
        with-icon
      >
        <TwIcon :path="mdiGithub" />
        GitHub
      </TwFilledButton>
    </div>
    <h3 class="tw-mt-4 tw-text-lg tw-font-medium">
      À propos de l'auteur et du projet
    </h3>
    <p class="!tw-mb-0">
      <b>Félix Desjardins</b><br />
      Transit Tracker est mon projet depuis plus de 7 ans (2018)! Je ne suis pas
      un développeur professionnel, loin de là. Toutefois, ce projet me permet
      de rester à jour sur les dernières technologies tout en m'amusant! Transit
      Tracker est en constante évolution, et avance selon mes disponibilités
      (alors parfois, il peut y avoir un certain temps entre les mises à jour).
      N'hésitez pas à me joindre pour me signaler tout problème ou commentaires!
    </p>
    <div class="tw-mt-2 tw-flex tw-flex-wrap tw-items-center tw-gap-2">
      <TwFilledButton
        color="secondary"
        tag="a"
        href="https://www.linkedin.com/in/felix-desjardins/"
        target="_blank"
        with-icon
      >
        <TwIcon :path="mdiLinkedin" />
        LinkedIn
      </TwFilledButton>
      <TwFilledButton
        color="secondary"
        tag="a"
        href="https://docs.google.com/forms/d/e/1FAIpQLSda-86sV12itRXPhLaw-WDDJI38GOSefq_7X006s1YP6pN4eg/viewform"
        target="_blank"
        with-icon
      >
        <TwIcon :path="mdiEmail" />
        Me contacter
      </TwFilledButton>
    </div>
  </div>
</template>

<script>
import { mdiGithub, mdiApi, mdiLinkedin, mdiEmail } from '@mdi/js'

export default {
  data: () => ({
    mdiGithub,
    mdiApi,
    mdiLinkedin,
    mdiEmail,
  }),
  computed: {
    version() {
      return process.env.version
    },
  },
}
</script>

<i18n>
  {
    "fr": {
      "appName": "Transit Tracker",
      "slogan": "Rendre accessible les données de transport en commun"
    }
  }
</i18n>
