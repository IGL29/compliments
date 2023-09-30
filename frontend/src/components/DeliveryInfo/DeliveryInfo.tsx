import cn from 'classnames';
import styles from './style.module.scss';
import { Fragment, useState, useTransition } from 'react';
import { Button } from '~components/Button';
import { DeliveryByRegion } from '~components/tabs/DeliveryByRegion/DeliveryByRegion';
import { DeliveryInMoscow } from '~components/tabs/DeliveryInMoscow/DeliveryInMoscow';
import { DeliveryPickup } from '~components/tabs/DeliveryPickup/DeliveryPickup';
import { Payment } from '~components/tabs/Payment/Payment';
import { useViewportSize } from '~hooks/useViewportSize';

const getTabPanel = (title: string, idTab: string, idTabPanel: string, component: JSX.Element) => ({
  title,
  idTab,
  idTabPanel,
  component: (
    <div role="tabpanel" id={idTabPanel} aria-labelledby={idTab}>
      {component}
    </div>
  ),
});

const tabPanels = [
  getTabPanel('Доставка по Москве', 'delivery-in-moscow-tab', 'delivery-in-moscow-panel', <DeliveryInMoscow />),
  getTabPanel(
    'Доставка по Московской области и в регионы',
    'delivery-by-region-tab',
    'delivery-by-region-panel',
    <DeliveryByRegion />,
  ),
  getTabPanel('Самовывоз заказа', 'delivery-pickup-tab', 'delivery-pickup-panel', <DeliveryPickup />),
  getTabPanel('Оплата товара', 'payment-tab', 'payment-panel', <Payment />),
];

const DeliveryInfo = () => {
  const [viewportSizes] = useViewportSize();
  const [_, startTransition] = useTransition();
  const isRenderTabs = viewportSizes.width > 992;
  const isRenderAccordion = !isRenderTabs;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const switchTab = (tabIndex: number) => {
    if (isRenderAccordion && tabIndex === activeTabIndex) {
      return startTransition(() => setActiveTabIndex(tabPanels.length));
    }
    startTransition(() => setActiveTabIndex(tabIndex));
  };

  const activeTab = tabPanels[activeTabIndex]
    ? tabPanels[activeTabIndex]
    : isRenderTabs
    ? tabPanels[0]
    : getTabPanel('', '', '', <></>);

  const variantBtn = (btnIndex: number) =>
    activeTabIndex === btnIndex || (isRenderTabs && activeTabIndex === tabPanels.length && btnIndex === 0) ? 3 : 2;

  const isActiveTab = (btnIndex: number) => activeTabIndex === btnIndex;

  const accordionJSX = (
    <div className={styles['accordion-wrapper']} data-testid="deliveryInfo">
      {tabPanels.map((tab, index) => {
        if (activeTab.component === tab.component) {
          return (
            <Fragment key={index}>
              <Button
                rootClassName={cn(styles['tab-btn'])}
                textClassName={cn(styles['tab-btn-text'])}
                text={tab.title}
                variant={variantBtn(index)}
                onClick={() => switchTab(index)}
              />
              <div className={styles['tab-wrapper']}>{activeTab.component}</div>
            </Fragment>
          );
        }
        return (
          <Fragment key={index}>
            <Button
              rootClassName={cn(styles['tab-btn'])}
              textClassName={cn(styles['tab-btn-text'])}
              text={tab.title}
              variant={variantBtn(index)}
              onClick={() => switchTab(index)}
            />
          </Fragment>
        );
      })}
    </div>
  );

  const tabsJSX = (
    <>
      <div className={styles['btn-wrapper']} role="tablist" aria-labelledby="tabs-delivery">
        {tabPanels.map((tab, index) => {
          return (
            <Button
              key={index}
              rootClassName={cn(styles['tab-btn'])}
              textClassName={cn(styles['tab-btn-text'])}
              text={tab.title}
              variant={variantBtn(index)}
              onClick={() => switchTab(index)}
              role="tab"
              id={tabPanels[index].idTab}
              ariaSelected={isActiveTab(index)}
              ariaControls={tabPanels[index].idTabPanel}
            />
          );
        })}
      </div>

      <div className={styles['tab-wrapper']}>{activeTab.component}</div>
    </>
  );

  return (
    <>
      {isRenderAccordion && accordionJSX}
      {isRenderTabs && tabsJSX}
    </>
  );
};

export { DeliveryInfo };
