<template>
  <div>
    <div
      class="-tw-mx-4 tw-bg-primary-40 tw-px-8 tw-py-4 tw-text-center tw-text-white dark:tw-bg-primary-80 dark:tw-text-primary-20"
    >
      <img src="/img/logo-white.svg" height="80px" />
      <h1 class="tw-font-heading">Transit Tracker</h1>
      <h3>Rendre accessible les données de transport en commun</h3>
      <p class="!tw-mb-0">Version {{ version }}</p>
    </div>
    <h3 class="tw-font-medium">Code source</h3>
    <p
      class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
    >
      Le code source de Transit Tracker est disponible sur GitHub. Vous êtes
      bienvenues de contribuer au développement de l'application!
      <TwFilledButton
        color="secondary"
        tag="a"
        class="tw-mt-2 tw-w-fit"
        href="https://github.com/TransitTracker"
        target="_blank"
        with-icon
      >
        <TwIcon :path="mdiGithub" />
        GitHub
      </TwFilledButton>
    </p>
    <h3 class="tw-font-medium">Technologies</h3>
    <p
      class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
    >
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
    <h3 class="tw-font-medium">Comment ca fonctionne?</h3>
    <p
      class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
    >
      La quasi totalité des données diffusées dans l'application proviennent des
      sociétés de transport. Voici comment ce processus s'effectue :
    </p>
    <ol>
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
    <p>
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
    <h3 class="tw-font-medium">Sans publicité</h3>
    <p
      class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
    >
      Les coûts d'opérations de Transit Tracker (serveur, domaine) sont assumées
      par son créateur. Aucune publicité n'est diffusée dans l'application.
    </p>
    <h3 class="tw-font-medium">Vous êtes développeurs?</h3>
    <p
      class="!tw-mb-0 tw-text-sm tw-text-neutralVariant-10 dark:tw-text-neutralVariant-90"
    >
      Vous pouvez utiliser la plupart des données de Transit Tracker dans votre
      application!
    </p>
    <TwFilledButton
      color="secondary"
      tag="a"
      class="tw-mt-2 tw-w-fit"
      href="https://api.transittracker.ca/docs"
      target="_blank"
      with-icon
    >
      <TwIcon :path="mdiApi" />
      Documentation de l'API
    </TwFilledButton>
  </div>
</template>

<script>
import { mdiGithub, mdiApi } from '@mdi/js'

export default {
  data: () => ({
    mdiGithub,
    mdiApi,
  }),
  computed: {
    version() {
      return process.env.version
    },
  },
}
</script>
