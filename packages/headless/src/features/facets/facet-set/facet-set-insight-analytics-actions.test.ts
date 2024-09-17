import {InsightEngine} from '../../../app/insight-engine/insight-engine';
import {ThunkExtraArguments} from '../../../app/thunk-extra-arguments';
import {buildMockInsightEngine} from '../../../test/mock-engine-v2';
import {buildMockFacetRequest} from '../../../test/mock-facet-request';
import {buildMockFacetSlice} from '../../../test/mock-facet-slice';
import {buildMockInsightState} from '../../../test/mock-insight-state';
import {getConfigurationInitialState} from '../../configuration/configuration-state';
import {
  logFacetBreadcrumb,
  logFacetClearAll,
  logFacetDeselect,
  logFacetSelect,
  logFacetUpdateSort,
  logFacetShowMore,
  logFacetShowLess,
} from './facet-set-insight-analytics-actions';

const mockLogBreadcrumbFacet = jest.fn();
const mockLogFacetSelect = jest.fn();
const mockLogFacetDeselect = jest.fn();
const mockLogFacetUpdateSort = jest.fn();
const mockLogFacetClearAll = jest.fn();
const mockLogFacetShowMore = jest.fn();
const mockLogFacetShowLess = jest.fn();

jest.mock('coveo.analytics', () => {
  const mockCoveoInsightClient = jest.fn(() => ({
    disable: () => {},
    logBreadcrumbFacet: mockLogBreadcrumbFacet,
    logFacetSelect: mockLogFacetSelect,
    logFacetDeselect: mockLogFacetDeselect,
    logFacetUpdateSort: mockLogFacetUpdateSort,
    logFacetClearAll: mockLogFacetClearAll,
    logFacetShowMore: mockLogFacetShowMore,
    logFacetShowLess: mockLogFacetShowLess,
  }));

  return {
    CoveoInsightClient: mockCoveoInsightClient,
    history: {HistoryStore: jest.fn()},
  };
});

describe('facet set insight analytics actions', () => {
  let engine: InsightEngine;

  const exampleSubject = 'example subject';
  const exampleDescription = 'example description';
  const exampleCaseId = '1234';
  const exampleCaseNumber = '5678';
  const exampleFacetId = 'exampleFacetId';
  const exampleField = 'exampleField';
  const exampleValue = 'exampleValue';
  const exampleSortCriterion = 'score';

  const baseExpectedPayload = {
    caseContext: {
      Case_Subject: exampleSubject,
      Case_Description: exampleDescription,
    },
    caseId: exampleCaseId,
    caseNumber: exampleCaseNumber,
    facetId: exampleFacetId,
    facetField: exampleField,
    facetTitle: `${exampleField}_${exampleFacetId}`,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    const configuration = getConfigurationInitialState();
    configuration.analytics.analyticsMode = 'legacy';

    engine = buildMockInsightEngine(
      buildMockInsightState({
        facetSet: {
          [exampleFacetId]: buildMockFacetSlice({
            request: buildMockFacetRequest({
              facetId: exampleFacetId,
              field: exampleField,
            }),
          }),
        },
        insightCaseContext: {
          caseContext: {
            Case_Subject: exampleSubject,
            Case_Description: exampleDescription,
          },
          caseId: exampleCaseId,
          caseNumber: exampleCaseNumber,
        },
        configuration,
      })
    );
  });

  it('should log #logBreadcrumbFacet with the right payload', async () => {
    await logFacetBreadcrumb({
      facetId: exampleFacetId,
      facetValue: exampleValue,
    })()(engine.dispatch, () => engine.state, {} as ThunkExtraArguments);

    const expectedPayload = {
      ...baseExpectedPayload,
      facetValue: exampleValue,
    };

    expect(mockLogBreadcrumbFacet).toHaveBeenCalledTimes(1);
    expect(mockLogBreadcrumbFacet.mock.calls[0][0]).toStrictEqual(
      expectedPayload
    );
  });

  it('should log #logFacetSelect with the right payload', async () => {
    await logFacetSelect({
      facetId: exampleFacetId,
      facetValue: exampleValue,
    })()(engine.dispatch, () => engine.state, {} as ThunkExtraArguments);

    const expectedPayload = {
      ...baseExpectedPayload,
      facetValue: exampleValue,
    };

    expect(mockLogFacetSelect).toHaveBeenCalledTimes(1);
    expect(mockLogFacetSelect.mock.calls[0][0]).toStrictEqual(expectedPayload);
  });

  it('should log #logFacetDeselect with the right payload', async () => {
    await logFacetDeselect({
      facetId: exampleFacetId,
      facetValue: exampleValue,
    })()(engine.dispatch, () => engine.state, {} as ThunkExtraArguments);

    const expectedPayload = {
      ...baseExpectedPayload,
      facetValue: exampleValue,
    };

    expect(mockLogFacetDeselect).toHaveBeenCalledTimes(1);
    expect(mockLogFacetDeselect.mock.calls[0][0]).toStrictEqual(
      expectedPayload
    );
  });

  it('should log #logFacetUpdateSort with the right payload', async () => {
    await logFacetUpdateSort({
      facetId: exampleFacetId,
      sortCriterion: exampleSortCriterion,
    })()(engine.dispatch, () => engine.state, {} as ThunkExtraArguments);

    const expectedPayload = {
      ...baseExpectedPayload,
      criteria: exampleSortCriterion,
    };

    expect(mockLogFacetUpdateSort).toHaveBeenCalledTimes(1);
    expect(mockLogFacetUpdateSort.mock.calls[0][0]).toStrictEqual(
      expectedPayload
    );
  });

  it('should log #logFacetClearAll with the right payload', async () => {
    await logFacetClearAll(exampleFacetId)()(
      engine.dispatch,
      () => engine.state,
      {} as ThunkExtraArguments
    );

    const expectedPayload = baseExpectedPayload;

    expect(mockLogFacetClearAll).toHaveBeenCalledTimes(1);
    expect(mockLogFacetClearAll.mock.calls[0][0]).toStrictEqual(
      expectedPayload
    );
  });

  it('should log #logFacetShowMore with the right payload', async () => {
    await logFacetShowMore(exampleFacetId)()(
      engine.dispatch,
      () => engine.state,
      {} as ThunkExtraArguments
    );

    const expectedPayload = baseExpectedPayload;

    expect(mockLogFacetShowMore).toHaveBeenCalledTimes(1);
    expect(mockLogFacetShowMore.mock.calls[0][0]).toStrictEqual(
      expectedPayload
    );
  });

  it('should log #logFacetShowLess with the right payload', async () => {
    await logFacetShowLess(exampleFacetId)()(
      engine.dispatch,
      () => engine.state,
      {} as ThunkExtraArguments
    );

    const expectedPayload = baseExpectedPayload;

    expect(mockLogFacetShowLess).toHaveBeenCalledTimes(1);
    expect(mockLogFacetShowLess.mock.calls[0][0]).toStrictEqual(
      expectedPayload
    );
  });
});
