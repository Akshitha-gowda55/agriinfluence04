import Image from 'next/image'
import { testimonials } from '../../lib/data'

export default function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">
            What Customers Say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Feedback from farmers and buyers using AgriInfluence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-xl border bg-background p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                "{testimonial.quote}"
              </p>

              <p className="mt-4 text-xs font-medium text-primary">
                Crop: {testimonial.crop}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}