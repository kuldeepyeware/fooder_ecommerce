/* eslint-disable turbo/no-undeclared-env-vars */
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui", "recharts"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3rts3x4c8sg1r.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};
