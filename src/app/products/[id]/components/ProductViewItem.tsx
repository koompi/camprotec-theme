"use client";

import React, { useState } from "react";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Image,
  Input,
  RadioGroup,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import RatingRadioGroup from "./RatingRadioGroup";
import { Attribute, ItemProduct, ProductType, Variants } from "@/types/product";
import { formatToUSD } from "@/utils/usd";
import { useCart } from "@/context/useCart";
import { VariantRadio } from "./VariantRadio";
import { LexicalReader } from "@/editor/LexicalReader";
import { useSearchParams } from "next/navigation";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// zoom image
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { toast } from "sonner";

export type ProductViewInfoProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  isLoading?: boolean;
  removeWrapper?: boolean;
  loading?: boolean;
} & ProductType;

const ProductViewInfo = React.forwardRef<HTMLDivElement, ProductViewInfoProps>(
  (
    {
      title,
      previews,
      price,
      desc,
      rating,
      variants,
      detail,
      stocks,
      className,
      ...props
    },
    ref
  ) => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || null;
    const cat = searchParams.get("category") || null;
    const sortParam = searchParams.get("sort") || null;
    const [selectedImage, setSelectedImage] = React.useState(previews[0]);
    const { addToCart } = useCart();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [previewType, setPreviewType] = useState<string | null>(null);
    const video_files = ["video/mp4", "video/mov", "video/webm"];

    const cartVariants = [
      {
        id: null,
        label: "Default",
        default: true,
        previews: previews[0],
        price: price,
        attributes: [],
      },
    ].concat(variants as never[]);

    const [variant, setVariant] = useState<Variants>({
      id: null,
      label: "Default",
      default: true,
      previews: previews[0],
      price: price,
      attributes: [],
    });

    // const [items, setItems] = useState<CartItem[]>([]);
    // const [selections, setSelections] = useState();

    // const handleAddToCart = (product: ItemProduct) => {
    //   let p: ItemProduct = {
    //     id: product?.id,
    //     variantId: null,
    //     name: product?.name,
    //     price: product?.price,
    //     currency: product?.currency,
    //     preview: product?.preview,
    //   };
    //   addToCart(p, false);
    // };

    // function to group items by date
    // const groupItemsByVariant = useCallback(() => {
    //   const groups = [] as any;
    //   variants?.forEach((item) => {
    //     if (!groups[item.attribute.split(" ")[0]]) {
    //       groups[item.attribute.split(" ")[0]] = [];
    //     }
    //     groups[item.attribute.split(" ")[0]].push(item);
    //   });

    //   return groups;
    // }, [variants]);

    // const groups = useMemo(() => {
    //   return groupItemsByVariant();
    // }, [groupItemsByVariant]);

    // console.log("groups", JSON.stringify(variants, null, 4));
    // const variantObjet = useMemo(() => {
    //   let result = {};
    //   variants.forEach((v) => {
    //     if (typeof result[v.attribute] === "undefined") {
    //       result[v.attribute] = { [v.label]: parseInt(v.price) };
    //     } else {
    //       result[v.attribute] = {
    //         ...result[v.attribute],
    //         [v.label]: parseInt(v.price),
    //       };
    //     }
    //   });

    //   return result;
    // }, [variants]);

    // const totalPrice = useMemo(() => {
    //   if (typeof selections !== "undefined") {
    //     let total = Object.entries<number>(selections)
    //       .map((e: [string, number]) => e[1])
    //       .reduce((a, b) => a + b);

    //     return total;
    //   }

    //   return 0;
    // }, [selections]);

    return (
      <>
        <Breadcrumbs
          size="lg"
          className="my-3"
          variant="light"
          color="primary"
          radius="lg"
        >
          <BreadcrumbItem href="/products">Products</BreadcrumbItem>
          <BreadcrumbItem
            href={`/products/?search${search ? search : ""}=&category=${
              props?.category?.id ? props?.category?.id : ""
            }&sort=${sortParam ? sortParam : ""}`}
          >
            {props?.category?.title?.en}
          </BreadcrumbItem>
          <BreadcrumbItem
            href={`/products/?search${search ? search : ""}=&category=${
              props?.category?.id ? props?.category?.id : ""
            }&sub_category=${props?.subcategories[0]?.id ? props?.subcategories[0]?.id : ""}&sort=${
              sortParam ? sortParam : ""
            }`}
          >
            {props?.subcategories[0]?.title?.en}
          </BreadcrumbItem>
          <BreadcrumbItem>{title}</BreadcrumbItem>
        </Breadcrumbs>
        <div
          ref={ref}
          className={cn(
            "relative flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8",
            className
          )}
          {...props}
        >
          <div className="relative col-span-2 h-full w-full flex-none">
            {/* ---- swiper scroll galleries ---- */}
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={false}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Autoplay, Navigation, Thumbs]}
              autoplay={{
                delay: 90000,
                disableOnInteraction: false,
              }}
              className="swiper-navigator swiperSlider2 bg-base-100 flex justify-center items-center px-0 rounded-3xl border "
            >
              {previews.map((preview, index) => (
                <SwiperSlide key={index} className="swiperSlider2">
                  {video_files.includes(preview.split(".")[1]) ? (
                    <video
                      className="h-[30dvh] sm:h-[30dvh] lg:h-[70dvh] w-full grid place-items-center"
                      autoPlay
                      loop
                      muted
                    >
                      <source
                        src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${preview}`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <InnerImageZoom
                      src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${preview}`}
                      zoomSrc={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${preview}`}
                      zoomType="hover"
                      className="object-contain object-center backdrop-filter backdrop-blur-xl h-full"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper as any}
              loop={true}
              autoplay={{
                delay: 90000,
                disableOnInteraction: false,
              }}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              className="mySwiper flex items-center mt-3"
              modules={[FreeMode, Autoplay, Navigation, Thumbs]}
            >
              {previews.map((preview, index) => (
                <SwiperSlide key={index} className="swiperSlider">
                  {video_files.includes(preview.split(".")[1]) ? (
                    <Icon
                      icon="solar:play-circle-bold-duotone"
                      className="relative cursor-pointer w-full h-full object-cover object-center text-primary"
                    />
                  ) : (
                    <Image
                      alt={title}
                      radius="lg"
                      src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${preview}`}
                      className="relative w-24 h-24 cursor-pointer object-cover object-center"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-16 hidden sm:hidden lg:block">
              <h2 className="text-xl font-semibold mb-3">Details</h2>
              <p className="text-medium text-default-500">
                <LexicalReader data={detail} />
              </p>
            </div>
          </div>

          {/* Product Info */}
          <div className="relative sm:relative lg:sticky top-3 sm:top-3 lg:top-28 col-span-1 flex flex-col border py-6 px-3 rounded-3xl">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <h2 className="sr-only">Product information</h2>
            <div className="my-2 flex items-center gap-2">
              <RatingRadioGroup
                hideStarsText
                size="sm"
                value={`${rating <= 0 ? "4" : rating}`}
              />
              <p>Reviews</p>
            </div>
            <p className="text-5xl text-primary font-bold tracking-tight">
              {formatToUSD(parseInt(variant.price.toString()))}
            </p>
            <div className="flex flex-col gap-1 my-4">
              <div className="flex items-center gap-2 text-default-700">
                <Icon icon="solar:box-line-duotone" fontSize={24} />
                {stocks?.status === "IN-STOCK" && (
                  <p className="text-small font-semibold text-primary">
                    {stocks?.status}
                  </p>
                )}
                {stocks?.status === "LOWER" && (
                  <p className="text-small font-semibold text-warning">
                    {stocks?.status}
                  </p>
                )}
                {stocks?.status === "OUT-OF-STOCK" && (
                  <p className="text-small font-semibold text-danger">
                    {stocks?.status}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-default-700">
                <Icon icon="carbon:delivery" fontSize={24} />

                <p className="text-small font-medium">
                  Delivery approx between{" "}
                  <span className="font-semibold text-primary">
                    Monday and Friday
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-default-700">
                <Icon icon="solar:delivery-line-duotone" fontSize={24} />
                <p className="text-small font-medium">
                  Shipping Tax:{" "}
                  <span className="text-primary font-semibold">
                    Base on delivery options
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="sr-only">Product desc</p>
              <p className="line-clamp-3 text-medium text-default-500">
                {desc}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-1">
              {/* <>
              {
                variants.length > 0 &&
                  variants.map((item: any, idx: number) => {
                    return (
                      <RadioGroup
                        aria-label="Select varaints"
                        orientation="horizontal"
                        label={`Variants`}
                        key={idx}
                        className="mt-3 grid-cols-2"
                      >
                        <TagGroupRadioItem
                          size="lg"
                          key={idx}
                          value={item?.id}
                          className="col-span-1"
                        >
                          <div className="flex items-center gap-3 p-3">
                            <Image
                              alt="varaints"
                              src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${item?.previews}`}
                              className="h-12"
                              radius="md"
                            />
                            <div>
                              <p className="line-clamp-2">{item.label}</p>
                              {item.attributes.map(
                                (atb: Attribute, idx: number) => {
                                  return <p key={idx}>{atb.option}</p>;
                                }
                              )}
                              <p className="text-base font-medium text-primary">
                                {formatToUSD(parseInt(item?.price.toString()))}
                              </p>
                            </div>
                          </div>
                        </TagGroupRadioItem>
                      </RadioGroup>
                    );
                  })
                // Object.keys(groups).map((item: string, idx: number) => {
                //   return (
                // <RadioGroup
                //   aria-label="Select varaints"
                //   orientation="horizontal"
                //   label={`Variants: (${item})`}
                //   key={idx}
                //   className="mt-3 grid-cols-2"
                // >
                // {groups[item]?.map((res: Variants, idx: number) => {
                //   return (
                //     <TagGroupRadioItem
                //       size="lg"
                //       key={idx}
                //       value={res?.id}
                //       className="col-span-1"
                //     >
                //       <div className="flex items-center gap-3 p-3">
                // <Image
                //   alt="varaints"
                //   src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${res?.previews}`}
                //   className="h-12"
                //   radius="md"
                // />
                //         <div>
                //           <p className="line-clamp-2">{res.label}</p>
                // <p className="text-base font-medium text-primary">
                //   {formatToUSD(parseInt(res?.price.toString()))}
                // </p>
                //         </div>
                //       </div>
                //     </TagGroupRadioItem>
                //     );
                //   })}
                // </RadioGroup>
                //   );
                // }
              }
            </> */}
              {variants.length > 0 && (
                <RadioGroup label="Variants" defaultValue={props.id}>
                  <div className="grid grid-cols-2 gap-2">
                    {variants.length > 0 &&
                      cartVariants.map((item: Variants, idx: number) => {
                        return (
                          <VariantRadio
                            key={idx}
                            value={item?.id ? item.id : props.id}
                            onChange={(_) =>
                              setVariant({
                                ...item,
                                default: item.id ? false : true,
                              })
                            }
                          >
                            <div className="flex items-center space-x-4">
                              <Image
                                alt="variants"
                                src={`${process.env.NEXT_PUBLIC_DRIVE ?? "https://drive.backnd.riverbase.org"}/api/drive?hash=${item?.previews}`}
                                className="h-12"
                                radius="md"
                              />
                              <div>
                                <span className="text-md font-bold">
                                  {item.label}
                                </span>
                                <p className="text-base font-medium text-primary">
                                  {formatToUSD(
                                    parseInt(item?.price.toString())
                                  )}
                                </p>
                                {item.attributes.map(
                                  (item: Attribute, idx: number) => (
                                    <div key={idx} className="text-xs flex">
                                      {/* <span>{item.type}: </span> */}
                                      <span>{item.option}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </VariantRadio>
                        );
                      })}
                  </div>
                </RadioGroup>
              )}
            </div>

            <div className="mt-12 flex gap-3">
              <Input
                variant="bordered"
                defaultValue="1"
                min={1}
                color="primary"
                size="lg"
                type="number"
                className="w-1/4"
              />
              <Button
                fullWidth
                className="text-medium font-medium text-base-100"
                variant="shadow"
                color="primary"
                size="lg"
                startContent={
                  <Icon icon="solar:cart-large-2-bold" width={24} />
                }
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const product: ItemProduct = {
                    id: variant.id ? variant.id : props.id,
                    name: title,
                    variant: variant,
                    price: variant ? variant.price : price,
                    currency: "USD",
                    preview: variant ? variant.previews : props?.thumbnail,
                    productId: props?.id,
                    variantId: variant.id ? variant.id : null,
                  };

                  addToCart(product);
                  toast.success("The product is added into the cart!");
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
          <div className="mt-16 block sm:block lg:hidden">
            <h2 className="text-xl font-semibold mb-3">Details</h2>
            <p className="text-medium text-default-500">
              <LexicalReader data={detail} />
            </p>
          </div>
        </div>
      </>
    );
  }
);

ProductViewInfo.displayName = "ProductViewInfo";

export default ProductViewInfo;
