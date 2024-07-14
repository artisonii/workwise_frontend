import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className=" text-center mb-5 text-lg">
        Please go to payment page to see the table
      </h1>
      <div className="flex justify-center">
        <Link href="/payments" className="border-2 rounded-sm p-2 bg-green-300">
          Navigate to Payment page
        </Link>
      </div>
    </div>
  );
}
