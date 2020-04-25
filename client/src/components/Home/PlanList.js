import React, { useState, useCallback } from 'react';
import {
  Filters,
  ResourceItem,
  Card,
  ResourceList,
  TextStyle,
} from '@shopify/polaris';

export default function PlanList({
  items = [],
  resourceName = { singular: 'Item', plural: 'Items' },
}) {
  const [queryValue, setQueryValue] = useState(null);
  const [listValue, setListValue] = useState(items);

  const handleQueryValueChange = useCallback(
    (value) => {
      setQueryValue(value);
      if (value) {
        setListValue(
          items.filter((elem) => {
            return (
              elem.name &&
              elem.name.toLowerCase().indexOf(value.toLowerCase()) > -1
            );
          }),
        );
      } else {
        setListValue(items);
      }
    },
    [items],
  );

  const handleQueryValueRemove = useCallback(() => {
    setListValue(items);
    setQueryValue(null);
  }, [items]);

  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={[]}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    ></Filters>
  );

  const onPlanSelect = (id) => {
    console.log('Plan ' + id + ' is slected');
  };

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={listValue}
        renderItem={renderItem}
        filterControl={filterControl}
      />
    </Card>
  );

  function renderItem(item) {
    const { id, name } = item;

    return (
      <ResourceItem id={id} onClick={() => onPlanSelect(id)}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
      </ResourceItem>
    );
  }
}