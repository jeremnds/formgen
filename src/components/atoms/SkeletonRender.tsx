import { Skeleton } from "./shadcn/skeleton";

export default function SkeletonRender() {
  return (
    <div className="basis-1/2">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-[40px] w-[80px] rounded-lg bg-purple-200" />

        <Skeleton className="h-[388px] w-[300px] rounded-lg bg-purple-200" />
      </div>
    </div>
  );
}
