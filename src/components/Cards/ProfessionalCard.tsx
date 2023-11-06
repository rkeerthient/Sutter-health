import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import HealthcareProfessional from "../../types/healthcare_professionals";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Image } from "@yext/pages/components";

const ProfessionalCard = ({ result }: CardProps<HealthcareProfessional>) => {
  const { name } = result;
  const { headshot, mainPhone, c_speciality } = result.rawData;
  return (
    <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        {headshot && (
          <Image
            image={headshot}
            className="mx-auto h-52 w-52 flex-shrink-0 rounded-full"
          ></Image>
        )}
        <h3 className="mt-6 text-sm font-medium text-gray-900">{name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">{c_speciality?.join(", ")}</dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
              <EnvelopeIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${mainPhone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
