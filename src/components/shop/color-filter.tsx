import { CheckBox } from '@components/ui/checkbox';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useFilteredData } from './../../FilteredDataContext';


const colorFilterItems = [
  {
    id: '1',
    name: 'Black',
    slug: 'black',
    hexColor: '#000',
  },
  {
    id: '2',
    name: 'Pink',
    slug: 'pink',
    hexColor: '#3310ce',
  },
  {
    id: '3',
    name: 'Purple',
    slug: 'purple',
    hexColor: '#0c7448',
  },
  {
    id: '4',
    name: 'Red',
    slug: 'red',
    hexColor: '#5f0e0e',
  },
  {
    id: '5',
    name: 'Brown',
    slug: 'brown',
    hexColor: '#362727',
  },
  {
    id: '6',
    name: 'White',
    slug: 'white',
    hexColor: '#fff',
  },
  {
    id: '7',
    name: 'Gray',
    slug: 'gray',
    hexColor: '#e1e1e1',
  },
];
export const ColorFilter = () => {
  const { filteredData } = useFilteredData();
  const { i18n, t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const selectedColors = query?.color ? (query.color as string).split(',') : [];
  const [formState, setFormState] = React.useState<string[]>(selectedColors);
  React.useEffect(() => {
    setFormState(selectedColors);
  }, [query?.color]);
  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    // setFormState(currentFormState);
    const { color, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { color: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }
  const items = colorFilterItems;

  let arrayProduct = []

  /*   console.log(filteredData)
   */
  console.log(i18n.language)
  filteredData.forEach((item: any) => {
    item.variations.forEach((variationColor: any) => {
      if (variationColor.attribute.slug.se === "color") {


        arrayProduct.push(
          {
            id: variationColor.id,
            name: variationColor.value[i18n.language],
            slug: variationColor.value[i18n.language],
            hexColor: variationColor.meta
          })
        console.log(arrayProduct)
      }
    })

  })

  const uniqueArrayProduct = Array.from(
    new Map(arrayProduct.map(item => [item.slug, item])).values()
  );

  /*   console.log(uniqueArrayProduct)
   */

  const finalFilteredItems = items.filter((item) =>
    arrayProduct.includes(item.slug)
  );



  return (
    <div className="block border-b border-gray-300 pb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t('text-colors')}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {uniqueArrayProduct?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={
              <span className="flex items-center">
                <span
                  className={`w-5 h-5 rounded-full block ltr:mr-3 rtl:ml-3 mt-0.5 border border-black border-opacity-20`}
                  style={{ backgroundColor: item.hexColor }}
                />
                {item.name}
              </span>
            }
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
