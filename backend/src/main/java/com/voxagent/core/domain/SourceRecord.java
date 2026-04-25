package com.voxagent.core.domain;

import java.util.Objects;

public class SourceRecord implements Comparable<SourceRecord> {
    private final String sourceId;
    private final String url;
    private final double biasPrior;
    private final long timestamp;

    public SourceRecord(String sourceId, String url, double biasPrior, long timestamp) {
        this.sourceId = sourceId;
        this.url = url;
        this.biasPrior = biasPrior;
        this.timestamp = timestamp;
    }

    public String getSourceId() { return sourceId; }
    public String getUrl() { return url; }
    public double getBiasPrior() { return biasPrior; }
    public long getTimestamp() { return timestamp; }

    @Override
    public int compareTo(SourceRecord other) {
        return this.sourceId.compareTo(other.sourceId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SourceRecord that = (SourceRecord) o;
        return Objects.equals(sourceId, that.sourceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sourceId);
    }
}
