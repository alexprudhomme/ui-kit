import {
  Controller,
  ControllerDefinitionsMap,
  CommerceEngineDefinitionOptions,
  defineProductList,
  defineCart,
  defineSearchBox,
  defineContext,
  defineRecentQueriesList,
  defineNotifyTrigger,
  defineQueryTrigger,
  defineRedirectionTrigger,
  defineStandaloneSearchBox,
  defineInstantProducts,
  defineBreadcrumbManager,
  defineSummary,
  definePagination,
  defineFacetGenerator,
  defineSort,
  defineProductView,
  getSampleCommerceEngineConfiguration,
  defineDidYouMean,
  defineRecommendations, //defineParameterManager,
} from '@coveo/headless-react/ssr-commerce';

type CommerceEngineConfig = CommerceEngineDefinitionOptions<
  ControllerDefinitionsMap<Controller>
>;

export default {
  // By default, the logger level is set to 'warn'. This level may not provide enough information for some server-side errors. To get more detailed error messages, set the logger level to a more verbose level, such as 'debug'.
  // loggerOptions: {level: 'debug'},
  configuration: {
    ...getSampleCommerceEngineConfiguration(),
  },
  controllers: {
    summary: defineSummary(),
    productList: defineProductList(),
    popularViewedRecs: defineRecommendations({
      options: {
        slotId: 'd73afbd2-8521-4ee6-a9b8-31f064721e73',
      },
    }),
    popularBoughtRecs: defineRecommendations({
      options: {
        slotId: 'af4fb7ba-6641-4b67-9cf9-be67e9f30174',
      },
    }),
    cart: defineCart(),
    searchBox: defineSearchBox(),
    context: defineContext(),
    recentQueriesList: defineRecentQueriesList(),
    notifyTrigger: defineNotifyTrigger(),
    queryTrigger: defineQueryTrigger(),
    redirectionTrigger: defineRedirectionTrigger(),
    standaloneSearchBox: defineStandaloneSearchBox({
      options: {redirectionUrl: '/search'},
    }),
    instantProducts: defineInstantProducts({options: {}}),
    pagination: definePagination({options: {pageSize: 9}}),
    sort: defineSort(),
    productView: defineProductView(),
    didYouMean: defineDidYouMean(),
    //parameterManager: defineParameterManager(), // TODO KIT-3462: implement parameter manager in sample
    facetGenerator: defineFacetGenerator(),
    breadcrumbManager: defineBreadcrumbManager(),
  },
} satisfies CommerceEngineConfig;
