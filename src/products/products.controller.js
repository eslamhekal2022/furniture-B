import { ProductModel } from "../../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name_en, name_ar,
      description_en, description_ar,
      price, category
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "يرجى رفع صورة واحدة على الأقل" });
    }

    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const newProduct = new ProductModel({
      name: { en: name_en, ar: name_ar },
      description: { en: description_en, ar: description_ar },
      price,
      category,
      images: imagePaths,
    });

    await newProduct.save();
     name_en, name_ar,
      description_en, description_ar,
      price, category
 

    res.status(201).json({ success: true, message: "تمت إضافة المنتج", newProduct });
  } catch (err) {
    res.status(500).json({ message: "فشل الإضافة", error: err });

    console.log(err)
  }
};

export const getAllProducts=async (req, res) => {
  const allProducts = await ProductModel.find()

  const count = allProducts.length
  res.status(200).json({message: "All products",success: true,data:allProducts,count})
}


export const productDet=async (req, res) => {
  const {id}=req.params
  if(!id){
    return res.status(400).json({message:"I don't found product",success:false})
  }
  try {
    const product=await ProductModel.findById(id)
    res.status(200).json({message:"this is product",success:true,data:product})
  } catch (error) {
res.status(400).json({ message: "An error occurred. Please try again later.", success: false });
  }
}

export const getCategoryProduct= async (req, res) => {
  try {
    const products = await ProductModel.aggregate([
      {
        $group: {
          _id: '$category',
          product: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$product' } 
      }
    ]);
    res.status(200).json({data:products,success:true});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const getFilterCat= async (req, res) => {
  const {category} = req.params;

  try {
    const products = await ProductModel.find({ category });
    res.status(200).json({data:products,success:true});
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المنتجات', error });
  }
}

export const deleteProduct= async (req, res) => {
  const {id}=req.params
if(!id){
  return res.status(400).json({message:"I don't found Product",success:false})
}
  try {
    const product=await ProductModel.findByIdAndDelete(id)
res.status(200).json({message:"this is product deleted",success:true,product})
    
  } catch (error) {
    res.status(400).json({message:"No i don't found it 😭",success:true})

  }
}