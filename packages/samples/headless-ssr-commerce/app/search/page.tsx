import * as externalCartAPI from '@/actions/external-cart-api';
import BreadcrumbManager from '@/components/breadcrumb-manager';
import ContextDropdown from '@/components/context-dropdown';
import FacetGenerator from '@/components/facets/facet-generator';
import ProductList from '@/components/product-list';
import SearchProvider from '@/components/providers/search-provider';
import Recommendations from '@/components/recommendation-list';
import SearchBox from '@/components/search-box';
import ShowMore from '@/components/show-more';
import Summary from '@/components/summary';
import Triggers from '@/components/triggers/triggers';
import {searchEngineDefinition} from '@/lib/commerce-engine';
import {NextJsNavigatorContext} from '@/lib/navigatorContextProvider';
import {defaultContext} from '@/utils/context';
import {headers} from 'next/headers';

export default async function Search() {
  // Sets the navigator context provider to use the newly created `navigatorContext` before fetching the app static state
  const navigatorContext = new NextJsNavigatorContext(headers());
  searchEngineDefinition.setNavigatorContextProvider(() => navigatorContext);

  // Fetches the cart items from an external service
  const items = await externalCartAPI.getCart();

  // Fetches the static state of the app with initial state (when applicable)
  const staticState = await searchEngineDefinition.fetchStaticState({
    controllers: {
      cart: {initialState: {items}},
      context: {
        language: defaultContext.language,
        country: defaultContext.country,
        currency: defaultContext.currency,
        view: {
          url: 'https://sports.barca.group/search',
        },
      },
    },
  });

  return (
    <SearchProvider
      staticState={staticState}
      navigatorContext={navigatorContext.marshal}
    >
      <ContextDropdown useCase="search" />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{flex: 1}}>
          <FacetGenerator />
        </div>
        <div style={{flex: 2}}>
          <Triggers />
          <SearchBox />
          <BreadcrumbManager />
          <Summary />
          <ProductList />
          {/* The ShowMore and Pagination components showcase two frequent ways to implement pagination. */}
          {/* <Pagination
          staticState={staticState.controllers.pagination.state}
          controller={hydratedState?.controllers.pagination}
        ></Pagination> */}
          <ShowMore />
        </div>

        <div style={{flex: 3}}>
          {/* popularBoughtRecs */}
          {/* TODO: KIT-3503: need to revisit the way recommendations are added*/}
          <Recommendations />
        </div>
      </div>
    </SearchProvider>
  );
}

export const dynamic = 'force-dynamic';
