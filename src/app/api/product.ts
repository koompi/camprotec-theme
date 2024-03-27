import { GET_ORDERS } from "@/graphql/orders";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT,
  GLOBAL_PRODUCT_FILTERING,
} from "@/graphql/product";
import { getClient, makePrivateClient } from "@/libs/client";

const client = getClient();

// const apiPrivate = makePrivateClient;

export async function getLatestProducts() {
  const { data } = await client.query({
    query: GET_ALL_PRODUCTS,
    variables: {
      filter: {
        limit: 11,
        skip: 0,
        sort: 1,
      },
    },
    
  });
  return {
    props: {
      products: data.storeProducts,
    },
  };
}

export async function filterProducts(searchParams?: {
  [key: string]: string | string[] | undefined;
}) {
  const search = searchParams?.search || null;
  const cat = searchParams?.category || null;
  const sub = searchParams?.sub_category || null;
  const page = (searchParams?.page as string) || null;
  const size = (searchParams?.size as string) || null;
  const minPice = (searchParams?.min_price as string) || null;
  const maxPice = (searchParams?.max_price as string) || null;
  const sortParam = (searchParams?.sort as string) || null;
  const price =
    ["price_low_to_high", "price_high_to_low"].includes(sortParam as string) ||
    null;

  const { data } = await client.query({
    query: GLOBAL_PRODUCT_FILTERING,
    variables: {
      tagId: cat ? (sub ? [sub] : [cat]) : search ? [] : null,
      keyword: search ? search : search,
      status: price ? "price" : null,
      range: minPice
        ? {
            start: parseInt(minPice as string),
            end: parseInt(maxPice as string),
          }
        : null,
      filter: {
        skip: page
          ? parseInt(page) > 1
            ? parseInt(page) * parseInt(size as string)
            : 0
          : 0,
        limit: size ? parseInt(size) : 32,
        sort: price ? (sortParam == "price_low_to_high" ? 1 : -1) : -1,
      },
    },
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      ...data.storeGlobalFilterProducts
    },
  };
}

export async function getProduct(slug: string | string[]) {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { slug: slug },
  });

  return {
    props: {
      product: data.storeProduct,
    },
  };
}
