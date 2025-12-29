export default function Test() {
  return (
    <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Tailwind Test</h1>
      <p className="text-xl">If this has a purple-blue gradient, Tailwind is working!</p>
      <button className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 rounded-xl font-bold">
        Test Button
      </button>
    </div>
  );
}