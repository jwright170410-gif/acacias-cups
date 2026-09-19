# Acacia's Cups — shop version

## Included
- Responsive home/shop page
- Six editable products
- Individual product URLs: `product.html?id=classic`, etc.
- Working browser basket using localStorage
- Quantity controls and remove buttons
- No accounts
- No payment processing
- Custom-order enquiry form placeholder
- Temporary real stock photography from Pexels

## IMPORTANT: replace the stock photography
The two Pexels images are genuine stock photographs and are only being used to make the shop look complete while you gather your mum's actual product photos. They are not photos of Acacia's Cups products.

Replace the `image:` URLs in `products.js` with local files such as:
`images/classic.jpg`
`images/sage.jpg`
`images/pink.jpg`

Then put those photographs in the `images` folder.

## Edit products
All product names, prices, descriptions and image URLs are in `products.js`. This is the main file your mum can edit when adding products.

## Basket
The basket is fully functional in the browser and persists with localStorage. It deliberately stops before payment. For a real shop, connect the final order step to a payment provider or an order/invoice workflow.

## Custom form
The form is front-end only. A static website cannot receive form submissions by itself. Connect it to a form-handling service before launch.

## Free hosting
Recommended beginner route: GitHub Pages.

1. Create a GitHub account.
2. Create a repository, e.g. `acacias-cups`.
3. Upload all files and the `images` folder.
4. Open Settings -> Pages.
5. Choose deployment from the `main` branch and root folder.
6. GitHub will give you a `github.io` address.
7. Buy your preferred domain from a domain registrar.
8. In GitHub Pages, add the custom domain.
9. At the domain registrar, add the DNS records GitHub asks for.
10. Wait for DNS/HTTPS setup to complete.

The hosting can be free, but your own domain name is normally a separate paid registration.

## Alternative
Cloudflare Pages and Netlify can also host this static site. Both support custom domains. See the official documentation linked in the accompanying ChatGPT response.
