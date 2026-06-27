package com.kshitiz.smart_feedback.dto;

public class DashboardResponse {

    private long totalReviews;
    private long fiveStar;
    private long fourStar;
    private long threeStar;
    private long twoStar;
    private long oneStar;

    public DashboardResponse() {
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    public long getFiveStar() {
        return fiveStar;
    }

    public void setFiveStar(long fiveStar) {
        this.fiveStar = fiveStar;
    }

    public long getFourStar() {
        return fourStar;
    }

    public void setFourStar(long fourStar) {
        this.fourStar = fourStar;
    }

    public long getThreeStar() {
        return threeStar;
    }

    public void setThreeStar(long threeStar) {
        this.threeStar = threeStar;
    }

    public long getTwoStar() {
        return twoStar;
    }

    public void setTwoStar(long twoStar) {
        this.twoStar = twoStar;
    }

    public long getOneStar() {
        return oneStar;
    }

    public void setOneStar(long oneStar) {
        this.oneStar = oneStar;
    }
}