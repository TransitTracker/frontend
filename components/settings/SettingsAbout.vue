<template>
  <div
    class="tw:text-sm tw:text-neutral-variant-10 tw:dark:text-neutral-variant-90"
  >
    <div
      class="tw:-mx-4 tw:flex tw:min-h-62 tw:flex-col tw:justify-around tw:bg-primary-40 tw:px-8 tw:py-4 tw:text-center tw:text-white tw:dark:bg-primary-80 tw:dark:text-primary-20"
    >
      <svg
        viewBox="0 0 295.01 403.72"
        xmlns="http://www.w3.org/2000/svg"
        class="tw:h-20"
      >
        <path
          class="tw:fill-current"
          d="m147.51 1.875c-80.34 0-145.63 65.291-145.63 145.63 0 84.709 87.863 198.79 126.94 245.63 9.708 11.651 27.428 11.651 37.137 0 39.32-46.845 127.18-160.92 127.18-245.63 0-80.34-65.291-145.63-145.63-145.63zm0 70.631c34.895 0 63.158 3.9481 63.158 31.58v78.945c0 6.948-3.0785 13.185-7.8945 17.527v10.105c0 6.553-5.3678 11.842-11.842 11.842-6.553 0-11.842-5.3678-11.842-11.842v-3.9473h-63.158v3.9473a11.826 11.826 0 0 1-11.842 11.842 11.826 11.826 0 0 1-11.844-11.842v-10.105c-4.816-4.342-7.8945-10.579-7.8945-17.527v-78.945c0-27.632 28.263-31.58 63.158-31.58zm-47.367 31.58v39.473h94.734v-39.473h-94.734zm11.842 63.156a11.826 11.826 0 0 0-11.842 11.844 11.826 11.826 0 0 0 11.842 11.842c6.552 0 11.842-5.2888 11.842-11.842a11.826 11.826 0 0 0-11.842-11.844zm71.051 0c-6.552 0-11.842 5.2908-11.842 11.844a11.826 11.826 0 0 0 11.842 11.842 11.826 11.826 0 0 0 11.842-11.842 11.826 11.826 0 0 0-11.842-11.844z"
        />
      </svg>
      <h1 class="tw:mt-4 tw:font-heading">{{ $t('appName') }}</h1>
      <h3 class="tw:my-2">{{ $t('slogan') }}</h3>
      <p class="tw:mb-0!">{{ $t('version') }} {{ version }}</p>
    </div>
    <div class="tw:prose tw:dark:prose-invert">
      <h3 class="tw:mt-4 tw:text-lg tw:font-medium">
        {{ $t('technologies.title') }}
      </h3>
      <p class="tw:mb-0!">{{ $t('technologies.desc') }}</p>

      <ul>
        <li>PHP</li>
        <li>Laravel</li>
        <li>Javascript</li>
        <li>Vue.js</li>
        <li>Nuxt.js</li>
        <li>Vuetify</li>
      </ul>

      <h3 class="tw:mt-4 tw:text-lg tw:font-medium">
        {{ $t('howItWorks.title') }}
      </h3>
      <p class="tw:mb-1!">{{ $t('howItWorks.intro') }}</p>

      <ol>
        <li>{{ $t('howItWorks.steps.1') }}</li>
        <li>{{ $t('howItWorks.steps.2') }}</li>
        <li>{{ $t('howItWorks.steps.3') }}</li>
        <li>{{ $t('howItWorks.steps.4') }}</li>
      </ol>

      <p class="tw:mb-1! tw:mt-2">{{ $t('considerations.intro') }}</p>
      <ul>
        <li v-html="$t('considerations.agencies')"></li>
        <li v-html="$t('considerations.incorrectData')"></li>
        <li v-html="$t('considerations.community')"></li>
      </ul>

      <h3 class="tw:mt-4 tw:text-lg tw:font-medium">
        {{ $t('privacy.title') }}
      </h3>
      <p class="tw:mb-0!" v-html="$t('privacy.desc')"></p>

      <h3 class="tw:mt-4 tw:text-lg tw:font-medium">
        {{ $t('developers.title') }}
      </h3>
      <p class="tw:mb-0!">{{ $t('developers.desc') }}</p>

      <div class="tw:mt-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <TwFilledButton
          color="secondary"
          tag="a"
          href="https://api.transittracker.ca/docs"
          target="_blank"
          with-icon
        >
          <TwIcon :path="mdiApi" />
          {{ $t('developers.apiDocs') }}
        </TwFilledButton>
        <TwFilledButton
          color="secondary"
          tag="a"
          href="https://github.com/TransitTracker"
          target="_blank"
          with-icon
        >
          <TwIcon :path="mdiGithub" />
          {{ $t('developers.github') }}
        </TwFilledButton>
      </div>

      <h3 class="tw:mt-4 tw:text-lg tw:font-medium">
        {{ $t('author.title') }}
      </h3>
      <p class="tw:mb-0!">
        <b>Félix Desjardins</b><br />
        {{ $t('author.desc') }}
      </p>

      <div class="tw:mt-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <TwFilledButton
          color="secondary"
          tag="a"
          href="https://www.linkedin.com/in/felix-desjardins/"
          target="_blank"
          with-icon
        >
          <TwIcon :path="mdiLinkedin" />
          {{ $t('author.linkedin') }}
        </TwFilledButton>
        <TwFilledButton
          color="secondary"
          tag="a"
          href="https://docs.google.com/forms/d/e/1FAIpQLSda-86sV12itRXPhLaw-WDDJI38GOSefq_7X006s1YP6pN4eg/viewform"
          target="_blank"
          with-icon
        >
          <TwIcon :path="mdiEmail" />
          {{ $t('author.contact') }}
        </TwFilledButton>
      </div>
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
    "slogan": "Rendre accessible les données de transport en commun",
    "version": "Version",
    "technologies": {
      "title": "Technologies",
      "desc": "Transit Tracker ne serait pas possible sans l’utilisation des technologies et bibliothèques suivantes, créées par d’autres développeurs :"
    },
    "howItWorks": {
      "title": "Comment ça fonctionne?",
      "intro": "La quasi-totalité des données diffusées dans l'application proviennent des sociétés de transport. Voici comment ce processus s'effectue :",
      "steps": {
        "1": "Transit Tracker récupère la liste des véhicules actifs auprès de l'agence, environ à chaque minute ou deux minutes;",
        "2": "Le serveur tente d'extraire le plus d'information possible afin de les stocker dans la base de données;",
        "3": "Le serveur associe certaines informations, comme le numéro de la route, à partir des données statiques récupérées quotidiennement;",
        "4": "Lors de leur visite, les visiteurs de l'application téléchargent du serveur la liste des véhicules actifs avec les données reliées."
      }
    },
    "considerations": {
      "intro": "Avec ce fonctionnement, il y a certains points à prendre en considération :",
      "agencies": "<b>Différences entre les agences :</b> Ce ne sont pas toutes les agences qui fournissent les mêmes données. Il peut alors y avoir certaines informations disponibles chez une agence mais pas chez l'autre;",
      "incorrectData": "<b>Données incorrectes :</b> Transit Tracker n'effectue pas de validation des données, il retransmet ce que l'agence fournit. Il peut y avoir des erreurs dans ces données;",
      "community": "<b>Contribution communautaire :</b> Pour certaines agences, comme les secteurs d'autobus d'exo, nous utilisons les contributions communautaires pour relier les identifiants des véhicules à leur numéro de flotte. <a href='https://vin.transittracker.ca' target='_blank'>Voir le projet exo VIN</a>."
    },
    "privacy": {
      "title": "Sans publicité et sans suivi",
      "desc": "Les coûts d’opération de Transit Tracker (serveur, domaine) sont assumés par son créateur. Aucune publicité n'est diffusée dans l'application.<br />Le programme Cloudflare Web Analytics est utilisé pour obtenir certaines statistiques sur l'application. Contrairement à d'autres produits, celui-ci ne fait pas le suivi des visiteurs individuels, étant conçu pour le respect de la vie privée."
    },
    "developers": {
      "title": "Vous êtes développeur?",
      "desc": "Vous pouvez utiliser la plupart des données de Transit Tracker dans votre application! Le code source de Transit Tracker est aussi disponible sur GitHub. Vous êtes bienvenus de contribuer au développement de l'application ou de vous en inspirer!",
      "apiDocs": "Documentation de l'API",
      "github": "GitHub"
    },
    "author": {
      "title": "À propos de l'auteur et du projet",
      "desc": "Transit Tracker est mon projet depuis plus de sept ans (2018)! Je ne suis pas un développeur professionnel, loin de là. Toutefois, ce projet me permet de rester à jour sur les dernières technologies tout en m'amusant! Transit Tracker est en constante évolution, et avance selon mes disponibilités (alors parfois, il peut y avoir un certain temps entre les mises à jour). N'hésitez pas à me joindre pour me signaler tout problème ou commentaire!",
      "linkedin": "LinkedIn",
      "contact": "Me contacter"
    }
  },
  "en": {
    "appName": "Transit Tracker",
    "slogan": "Making real-time transit data accessible",
    "version": "Version",
    "technologies": {
      "title": "Technologies",
      "desc": "Transit Tracker would not be possible without the use of the following technologies and libraries created by other developers:"
    },
    "howItWorks": {
      "title": "How does it work?",
      "intro": "Almost all data displayed in the app comes from transit agencies. Here’s how the process works:",
      "steps": {
        "1": "Transit Tracker fetches the list of active vehicles from the agency every one to two minutes;",
        "2": "The server extracts as much information as possible to store in the database;",
        "3": "The server links certain data, such as route numbers, using static data updated daily;",
        "4": "When visiting, app users download the list of active vehicles with related data from the server."
      }
    },
    "considerations": {
      "intro": "There are a few points to keep in mind:",
      "agencies": "<b>Differences between agencies:</b> Not all agencies provide the same data. Some information may be available for one agency but not another;",
      "incorrectData": "<b>Incorrect data:</b> Transit Tracker does not validate the data—it simply relays what the agency provides, which may include errors;",
      "community": "<b>Community contribution:</b> For some agencies, such as exo bus sectors, we use community contributions to link vehicle IDs with their fleet numbers. <a href='https://vin.transittracker.ca' target='_blank'>See the exo VIN project</a>;"
    },
    "privacy": {
      "title": "No ads, no tracking",
      "desc": "Transit Tracker’s operational costs (server, domain) are covered by its creator. No ads are displayed in the app.<br />Cloudflare Web Analytics is used to gather general usage statistics. Unlike other tools, it doesn’t track individual visitors and is designed with privacy in mind."
    },
    "developers": {
      "title": "Are you a developer?",
      "desc": "You can use most of Transit Tracker’s data in your own app! The source code is also available on GitHub. You’re welcome to contribute or take inspiration from it.",
      "apiDocs": "API Documentation",
      "github": "GitHub"
    },
    "author": {
      "title": "About the author and project",
      "desc": "Transit Tracker has been my project for over 7 years (since 2018)! I'm not a professional developer, but this project allows me to stay up-to-date with new technologies while having fun. The project is constantly evolving and progresses as I have time—so sometimes there may be gaps between updates. Feel free to reach out with feedback or issues!",
      "linkedin": "LinkedIn",
      "contact": "Contact me"
    }
  }
}
</i18n>
