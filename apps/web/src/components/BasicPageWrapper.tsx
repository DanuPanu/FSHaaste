import Link from "next/link";
import { Breadcrumb, generateBreadcrumbs } from "../helpers/breadcrumbs";
import { usePathname } from "next/navigation";

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
  parent?: {
    path: string;
    name: string;
  };
}

export function BasicPageWrapper({
  children,
  title,
  parent,
}: PageWrapperProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <>
      <div className=" w-full flex h-8">
        <ol className="flex items-center text-sm">
          {breadcrumbs.map((breadcrumb: Breadcrumb, index: number) => (
            <li key={breadcrumb.href} className="flex items-center">
              <Link
                href={breadcrumb.href}
                className="text-gray-500 hover:text-gray-800"
              >
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-1 text-gray-500">/</span>
              )}
            </li>
          ))}
        </ol>
        {parent && (
          <Link
            href={parent.path}
            className="text-gray-500 hover:text-gray-800 flex justify-end ml-auto items-center text-sm gap-1"
          >
            <span>←</span> Back to {parent.name}
          </Link>
        )}
      </div>
      <div className="bg-white rounded-xl w-full shadow-sm p-5 grow max-w-[1000px]">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold mb-5">{title}</h1>
        </div>
        {children}
      </div>
    </>
  );
}
