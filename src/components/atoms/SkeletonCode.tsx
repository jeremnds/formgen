import { Skeleton } from "./shadcn/skeleton";

export default function SkeletonCode() {
  return (
    <div className="basis-1/2">
      <div className="flex flex-col gap-6">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-[40px] w-[80px] rounded-lg bg-purple-200" />
          <Skeleton className="h-[40px] w-[100px] rounded-full bg-purple-200" />
        </div>
        <Skeleton className="h-[24rem] w-[800px] bg-purple-200" />
      </div>
    </div>
  );
}
