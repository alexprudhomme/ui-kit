import {
  sectionSelector,
  findSection,
} from '../../common/atomic-layout-section/sections';

const tabsSelector = 'atomic-insight-tabs';
const refineModalSelector = 'atomic-insight-refine-modal';
const pagerSelector = 'atomic-insight-pager';

export function buildInsightLayout(element: HTMLElement, widget: boolean) {
  const id = element.id;
  const layoutSelector = `atomic-insight-layout#${id}`;

  const hasTabs = Boolean(
    findSection(element, 'search')?.querySelector(tabsSelector)
  );

  const interfaceStyle = widget
    ? `
  ${layoutSelector} {
    display: grid;
    grid-template-rows: auto 8fr 1fr;
    max-height: 100%;
    box-sizing: border-box;
  }
  ${layoutSelector} ${refineModalSelector} {
    grid-row-start: 5;
  }`
    : '';

  const search = `${sectionSelector('search')} {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto auto auto;
      grid-gap: 0.5rem;
      background: var(--atomic-neutral-light);
      padding-top: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      box-sizing: border-box;
      ${!hasTabs ? 'padding-bottom: 1.5rem;' : ''}
    }
    ${sectionSelector('search')} ${tabsSelector} {
      grid-column: 1 / 5;
    }
    `;

  const results = `
    ${sectionSelector('results')} {
      overflow: auto;
    }
    `;

  const pagination = `
    ${sectionSelector('pagination')} {
      background: var(--atomic-neutral-light);
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: stretch;
    }
    ${
      widget
        ? `
        ${sectionSelector('pagination')} ${pagerSelector} {
          width: 100%;
        }
        ${sectionSelector('pagination')} ${pagerSelector}::part(buttons) {
          justify-content: space-between;
        }
    `
        : ''
    }
    `;
  return [interfaceStyle, search, results, pagination]
    .filter((declaration) => declaration !== '')
    .join('\n\n');
}
