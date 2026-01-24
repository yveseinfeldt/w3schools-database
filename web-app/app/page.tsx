import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <nav>
        <ul>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
