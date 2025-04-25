import React from "react";
import fs from "fs";
import path from "path";

export default function EquivalencyGuide() {
  // Static import for now; for SSR/SSG you could fetch from the md file
  const content = `
**About Electronic Component Equivalency**

Electronic component equivalency means that two or more parts can be substituted for each other in a circuit, either directly or with minimal changes. However, not all equivalents are perfect replacements—always check key specifications such as voltage, current, power, and package type before substituting.

**What Makes Two Parts Equivalent?**
- Electrical Compatibility: Specs like voltage, current, and gain must match or be close enough for your application.
- Package/Footprint: The physical package should fit your PCB or breadboard.
- Functionality: Ensure the replacement supports all the features you need.
- Manufacturer Notes: Sometimes, manufacturers provide recommended equivalents or drop-in replacements.

**Caveats and Cautions**
- Always check the datasheet before substituting.
- Some equivalents may have slight differences in performance or reliability.
- For critical applications, test the equivalent in your circuit before full deployment.

**Helpful Resources**
- [All About Circuits: Equivalent Components](https://www.allaboutcircuits.com/textbook/semiconductors/chpt-4/equivalent-circuits/)
- [EEVblog Forum: Equivalent Parts](https://www.eevblog.com/forum/beginners/equivalent-electronic-components/)
- [Application Notes](https://www.ti.com/reference-designs/index.html)

For more information, always consult the manufacturer datasheet and technical support.`;

  return (
    <section className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
      <h2 className="text-xl font-bold mb-2 text-blue-900">About Equivalency</h2>
      <div className="prose prose-sm max-w-none text-blue-900" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
    </section>
  );
}
