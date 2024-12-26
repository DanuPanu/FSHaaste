"use client";

import { BasicPageWrapper } from "../components/BasicPageWrapper";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useFactories } from "./FactoriesContext";


export default function Web() {

  const {factories}  = useFactories();

  return (
    <BasicPageWrapper title="Home">
      <div>
        <ul>
          <li>
            {factories.map((factory : any) =>(
              <>
                <Link href={`http://localhost:3000/${factory.name}`} className="flex justify-between items-center border-b pb-2 pt-2">
                  <h2>{factory.name}</h2>
                  <MdKeyboardArrowRight className="text-4xl"/>
                </Link>
              </>
            ))}
          </li>
        </ul>
      </div>
      <div className="mt-5 flex justify-end">
        <Link className="font-bold" href={`http://localhost:3000/addFactory`}>Lisää uusi tehdas</Link>
      </div>
    </BasicPageWrapper>
  );
}
