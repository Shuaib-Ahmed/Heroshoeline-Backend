const Review = require("../models/reviews");
const groupItem = require("../models/groupItems");

const getReview = async (req, res) => {
  const { order_id, limit, article_number } = req.query;

  let filter;

  if (order_id !== undefined) {
    filter = { ...filter, order_id: order_id };
  }
  if (article_number !== undefined) {
    filter = { ...filter, article_number: article_number };
  }

  try {
    const response = await Review.find({ ...filter }).limit(limit);
    const reviewCount = await Review.count({...filter});
    
    res.status(200).json({
      error: false,
      message: "Successfully Fetched",
      responseData: response,
      totalReview: reviewCount,

    });
  } catch (error) {
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
};

const createReview = async (req, res) => {
  try {
    const { reviewData } = req.body;
    const { article_number } = reviewData;
    const { userId } = req.user;

    const allReviewData = await Review.find({ article_number: article_number });
    let total = 0;

    if (allReviewData.length === 0) {
      await groupItem.findOneAndUpdate(
        { article_number: article_number },
        { average_rating: reviewData.rating, total_rating: 1 }
      );

      await Review.create({ user_id: userId, ...reviewData });

      res.status(200).json({ error: false, message: "Successfully Reviewed" });

      return;
    } else {
      allReviewData.map(async ({ rating }, index) => {
        try {
          total = total + Number(rating);

          if (index === allReviewData.length - 1) {
            total = total + Number(reviewData.rating);
            const avg = Number(Math.floor(total / (allReviewData.length + 1)));

            const updateData = {
              average_rating: avg,
              total_rating: allReviewData.length + 1,
            };

            await groupItem.findOneAndUpdate(
              { article_number: article_number },
              { ...updateData }
            );

            await Review.create({ user_id: userId, ...reviewData });

            res
              .status(200)
              .json({ error: false, message: "Successfully Reviewed" });
          }
        } catch (error) {
          console.log(error);
          res
            .status(400)
            .json({ error: true, message: "Something Went Wrong" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something Went Wrong" });
  }
};

module.exports = {
  getReview,
  createReview,
};
