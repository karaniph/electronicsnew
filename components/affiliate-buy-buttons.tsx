import { ShoppingCart } from "lucide-react"

type AffiliateButtonsProps = {
  productName: string
  productType: string
  className?: string
}

export function AffiliateBuyButtons({ productName, productType, className = "" }: AffiliateButtonsProps) {
  // Generate affiliate links (in a real implementation, you would use your actual affiliate links)
  const amazonLink = `https://www.amazon.com/s?k=${encodeURIComponent(productName)}+${encodeURIComponent(productType)}&tag=YOUR_AMAZON_AFFILIATE_ID`
  const aliExpressLink = `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(productName)}+${encodeURIComponent(productType)}&aff_id=YOUR_ALIEXPRESS_AFFILIATE_ID`

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <h3 className="text-sm font-medium text-gray-700">Buy this component:</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#FF9900] text-white px-4 py-2 rounded-lg hover:bg-[#e68a00] transition-colors text-sm font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy on Amazon
        </a>
        <a
          href={aliExpressLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#FF4747] text-white px-4 py-2 rounded-lg hover:bg-[#e63c3c] transition-colors text-sm font-medium"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy on AliExpress
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        *Affiliate links. We may earn a commission on purchases made through these links.
      </p>
    </div>
  )
}
