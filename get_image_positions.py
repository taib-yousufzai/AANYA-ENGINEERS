import fitz

pdf_path = "CompanyProfile.pdf"
doc = fitz.open(pdf_path)

page = doc.load_page(9) # page 10
image_list = page.get_images(full=True)
print(f"Page 10 has {len(image_list)} images.")

for i, img in enumerate(image_list):
    xref = img[0]
    rects = page.get_image_rects(xref)
    print(f"Image {i} (xref={xref}): bounding box rects = {rects}")

# Let's also look at all blocks on page 10 to see text positioning
for b in page.get_text("blocks"):
    print(f"Block rect = {b[:4]}, Text = {repr(b[4])}")
