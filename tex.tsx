<div className="min-h-screen bg-white pt-20">
      {/* Gallery */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 h-[320px] md:h-[480px] overflow-hidden">
          {/* Main image */}
          <div className="relative lg:col-span-7 overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          {/* Secondary images */}
          <div className="hidden md:grid lg:col-span-5 grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image
                  src={img}
                  alt={`${property.title} ${i + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="25vw"
                />
                {i === 3 && property.images.length > 5 && (
                  <div className="absolute inset-0 bg-forest/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">+{property.images.length - 5} More</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back button overlay */}
        <Link
          href="/properties"
          className="absolute top-4 left-4 flex items-center gap-2 glass-card px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-forest capitalize">
                  {property.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  property.status === "for-sale" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {property.status === "for-sale" ? "For Sale" : property.status === "for-rent" ? "For Rent" : "Sold"}
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-forest mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={14} className="text-green-mid" />
                {property.location}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {property.bedrooms && (
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <Bed size={20} className="text-forest mx-auto mb-1" />
                  <div className="font-bold text-forest text-lg">{property.bedrooms}</div>
                  <div className="text-xs text-gray-500">Bedrooms</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <Bath size={20} className="text-forest mx-auto mb-1" />
                  <div className="font-bold text-forest text-lg">{property.bathrooms}</div>
                  <div className="text-xs text-gray-500">Bathrooms</div>
                </div>
              )}

              {property.area && (
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <Maximize2 size={20} className="text-forest mx-auto mb-1" />
                <div className="font-bold text-forest text-base">{property.area}</div>
                <div className="text-xs text-gray-500">Area</div>
              </div>
              )}
              
              {property.yearBuilt && (
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <Calendar size={20} className="text-forest mx-auto mb-1" />
                  <div className="font-bold text-forest text-lg">{property.yearBuilt}</div>
                  <div className="text-xs text-gray-500">Year Built</div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display font-semibold text-forest text-xl mb-4">About This Property</h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 leading-relaxed">{property.fullDesc}</p>
              </div>
            </div>

            {/* Features */}
         {property.features && (
             <div className="mb-8">
              <h2 className="font-display font-semibold text-forest text-xl mb-4">Property Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-forest" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
         )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Price Card */}
              <div className="bg-white border border-emerald-100 rounded-2xl shadow-luxury p-6 mb-4">
                <div className="mb-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Starting from</p>
                  <p className="font-display font-bold text-3xl text-forest">{property.price}</p>
                </div>

                <div className="section-divider mb-4" />

                <div className="mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Agent</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-forest font-bold text-sm">
                        {property.agent.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-forest text-sm">{property.agent.name}</p>
                      <p className="text-gray-400 text-xs">Verified Agent</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm transition-all hover:shadow-lg"
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-semibold text-sm transition-all hover:shadow-lg"
                  >
                    <Phone size={16} />
                    Call Agent
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-forest text-forest font-semibold text-sm hover:bg-emerald-50 transition-all"
                  >
                    Send Enquiry
                  </Link>
                </div>
              </div>

              {/* Details summary */}
              <div className="bg-emerald-50 rounded-2xl p-5 text-sm">
                <h4 className="font-semibold text-forest mb-3 text-sm">Property Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="text-forest font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="text-green-600 font-medium capitalize">{property.status.replace("-", " ")}</span>
                  </div>
                 {property.area && (
                   <div className="flex justify-between">
                    <span className="text-gray-500">Area</span>
                    <span className="text-forest font-medium">{property.area}</span>
                  </div>
                 )}
                  {property.yearBuilt && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year Built</span>
                      <span className="text-forest font-medium">{property.yearBuilt}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="text-forest font-medium text-right max-w-[150px] leading-tight">{property.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="font-display font-bold text-2xl text-forest mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>